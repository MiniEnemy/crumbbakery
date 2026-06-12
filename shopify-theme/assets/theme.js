/* ==========================================================================
   Crumb & Co. – Shopify Theme JS
   Vanilla JS, ES6+, production-ready
   ========================================================================== */

(() => {
  "use strict";

  /* =========================================================================
     Cart State & AJAX
     ========================================================================= */

  let cart = { items: [], total_price: 0, item_count: 0 };

  function openCartDrawer() {
    document.querySelector(".cart-drawer-overlay")?.classList.add("active");
    document.querySelector(".cart-drawer")?.classList.add("open");
    document.body.style.overflow = "hidden";
    fetchCart();
  }

  function closeCartDrawer() {
    document.querySelector(".cart-drawer-overlay")?.classList.remove("active");
    document.querySelector(".cart-drawer")?.classList.remove("open");
    document.body.style.overflow = "";
  }

  async function fetchCart() {
    try {
      const response = await fetch("/cart.js");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      cart = await response.json();
      updateCartUI();
    } catch (e) {
      console.error("Cart fetch error:", e);
    }
  }

  async function addToCart(variantId, quantity = 1, notes = "") {
    try {
      const payload = {
        items: [
          {
            id: variantId,
            quantity,
            ...(notes ? { properties: { _notes: notes } } : {}),
          },
        ],
      };
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        openCartDrawer();
        fetchCart();
      } else {
        const err = await response.json();
        console.error("Add to cart failed:", err.description || response.statusText);
      }
    } catch (e) {
      console.error("Add to cart error:", e);
    }
  }

  async function updateCartItem(key, quantity) {
    try {
      const response = await fetch("/cart/change.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: key, quantity }),
      });
      if (response.ok) {
        fetchCart();
      } else {
        const err = await response.json();
        console.error("Update cart failed:", err.description || response.statusText);
      }
    } catch (e) {
      console.error("Update cart error:", e);
    }
  }

  async function removeFromCart(key) {
    return updateCartItem(key, 0);
  }

  async function clearCart() {
    try {
      await fetch("/cart/clear.js", { method: "POST" });
      fetchCart();
    } catch (e) {
      console.error("Clear cart error:", e);
    }
  }

  function formatPrice(cents) {
    return `AED ${(cents / 100).toFixed(2)}`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function updateCartUI() {
    const badge = document.querySelector(".cart-count-badge");
    if (badge) {
      badge.textContent = cart.item_count;
      badge.style.display = cart.item_count > 0 ? "flex" : "none";
    }

    const container = document.querySelector(".cart-drawer-items");
    if (!container) return;

    if (cart.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <p>Your cart is empty</p>
          <a href="/collections/all" class="btn btn--primary">Start Shopping</a>
        </div>`;
      return;
    }

    container.innerHTML = cart.items
      .map(
        (item) => `
      <div class="cart-item" data-key="${item.key}">
        <img src="${escapeHtml(item.image || "")}" alt="${escapeHtml(item.title)}" class="cart-item-image" referrerpolicy="no-referrer" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${escapeHtml(item.title)}</h4>
          ${item.variant_title ? `<p class="cart-item-variant">${escapeHtml(item.variant_title)}</p>` : ""}
          <div class="cart-item-controls">
            <div class="qty-controls">
              <button class="qty-btn" data-qty-key="${item.key}" data-qty-adj="-1" aria-label="Decrease quantity">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-qty-key="${item.key}" data-qty-adj="1" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
        <button class="cart-item-remove" data-remove-key="${item.key}" aria-label="Remove item">&times;</button>
      </div>`
      )
      .join("");

    // Bind quantity +/- and remove buttons via delegation on the container
    container.onclick = (e) => {
      const qtyBtn = e.target.closest("[data-qty-key]");
      if (qtyBtn) {
        const key = qtyBtn.dataset.qtyKey;
        const adj = Number(qtyBtn.dataset.qtyAdj);
        const item = cart.items.find((i) => String(i.key) === String(key));
        if (item) {
          const newQty = item.quantity + adj;
          if (newQty < 1) removeFromCart(key);
          else updateCartItem(key, newQty);
        }
      }
      const removeBtn = e.target.closest("[data-remove-key]");
      if (removeBtn) {
        removeFromCart(removeBtn.dataset.removeKey);
      }
    };

    const subtotal = document.querySelector(".cart-subtotal");
    if (subtotal) subtotal.textContent = formatPrice(cart.total_price);
  }

  /* =========================================================================
     1. Header Scroll Effect + Smooth Scroll to Sections
     ========================================================================= */

  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    document.querySelectorAll('.site-header a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          closeMobileMenu();
        }
      });
    });
  }

  /* =========================================================================
     2. Mobile Menu Toggle
     ========================================================================= */

  let mobileMenuOpen = false;

  function openMobileMenu() {
    const nav = document.querySelector(".mobile-nav");
    if (!nav) return;
    mobileMenuOpen = true;
    nav.classList.add("mobile-menu-open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    const nav = document.querySelector(".mobile-nav");
    if (!nav) return;
    mobileMenuOpen = false;
    nav.classList.remove("mobile-menu-open");
    document.body.style.overflow = "";
  }

  function toggleMobileMenu() {
    if (mobileMenuOpen) closeMobileMenu();
    else openMobileMenu();
  }

  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger-toggle, .mobile-menu-toggle, [data-mobile-menu-toggle]");
    if (hamburger) hamburger.addEventListener("click", toggleMobileMenu);

    const closeBtn = document.querySelector(".mobile-nav-close, [data-mobile-menu-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);

    document.querySelectorAll(".mobile-nav a[href]").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.querySelector(".mobile-nav-overlay")?.addEventListener("click", closeMobileMenu);
  }

  /* =========================================================================
     4. Hero Canvas – Icing Drips Animation
     ========================================================================= */

  function initHeroCanvas() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, animId;

    function resize() {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 360;
    }
    resize();
    window.addEventListener("resize", resize);

    const drips = [];
    const dripCount = Math.min(Math.floor(width / 35), 35);
    for (let i = 0; i < dripCount; i++) {
      const segmentWidth = width / dripCount;
      drips.push({
        x: i * segmentWidth + segmentWidth / 2 + (Math.random() - 0.5) * 15,
        y: -10,
        targetY: 80 + Math.random() * 110,
        radius: 12 + Math.random() * 16,
        speed: 0.15 + Math.random() * 0.25,
        wiggle: 1 + Math.random() * 3,
        phase: Math.random() * Math.PI,
      });
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      t += 0.01;

      // Top icing band
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, 40);
      for (let x = width; x >= 0; x -= 10) {
        const wave = Math.sin(x * 0.005 + t * 0.6) * 15 + Math.cos(x * 0.02 + t * 0.2) * 5;
        ctx.lineTo(x, 45 + wave);
      }
      ctx.closePath();
      ctx.fill();

      // Individual drips
      drips.forEach((drip) => {
        if (drip.y < drip.targetY) drip.y += drip.speed;
        const wiggleX = drip.x + Math.sin(t * 1.5 + drip.phase) * drip.wiggle;

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(drip.x - drip.radius * 0.7, 40);
        ctx.quadraticCurveTo(drip.x, drip.y - drip.radius, wiggleX - drip.radius, drip.y);
        ctx.arc(wiggleX, drip.y, drip.radius, Math.PI, 0, true);
        ctx.quadraticCurveTo(drip.x, drip.y - drip.radius, drip.x + drip.radius * 0.7, 40);
        ctx.closePath();
        ctx.fill();

        // Glossy highlight
        ctx.fillStyle = "rgba(251, 237, 228, 0.45)";
        ctx.beginPath();
        ctx.arc(wiggleX - drip.radius * 0.3, drip.y - drip.radius * 0.3, drip.radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }
    draw();
  }

  /* =========================================================================
     5. Menu Section – Client-side Filtering & Product Modal
     ========================================================================= */

  function initMenuSection() {
    const section = document.querySelector(".menu-section, [data-menu-section]");
    if (!section) return;

    let activeCategory = "all";
    let activeDiet = "all";
    let searchQuery = "";

    const categoryTabs = section.querySelectorAll("[data-category-tab]");
    const dietTabs = section.querySelectorAll("[data-diet-filter]");
    const searchInput = section.querySelector(".menu-search-input, [data-menu-search]");
    const productGrid = section.querySelector(".menu-product-grid, [data-menu-grid]");
    const productCount = section.querySelector(".menu-product-count, [data-menu-count]");
    const modal = document.querySelector(".product-modal, [data-product-modal]");
    const modalOverlay = document.querySelector(".product-modal-overlay, [data-product-modal-overlay]");

    const products = Array.from(section.querySelectorAll("[data-product-card]")).map((card) => ({
      el: card,
      category: card.dataset.productCategory || "",
      diet: card.dataset.productDiet || "",
      name: card.dataset.productName || "",
    }));

    function applyFilters() {
      let visibleCount = 0;
      products.forEach((p) => {
        const matchesCategory = activeCategory === "all" || p.category === activeCategory;
        const matchesDiet = activeDiet === "all" || p.diet === activeDiet;
        const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery);
        const show = matchesCategory && matchesDiet && matchesSearch;
        p.el.style.display = show ? "" : "none";
        if (show) visibleCount++;
      });
      if (productCount) productCount.textContent = visibleCount;
    }

    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        categoryTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.dataset.categoryTab;
        applyFilters();
      });
    });

    dietTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        dietTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeDiet = tab.dataset.dietFilter;
        applyFilters();
      });
    });

    if (searchInput) {
      let debounce;
      searchInput.addEventListener("input", () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          searchQuery = searchInput.value.trim().toLowerCase();
          applyFilters();
        }, 250);
      });
    }

    applyFilters();

    // Product modal
    productGrid?.addEventListener("click", (e) => {
      const card = e.target.closest("[data-product-card]");
      if (!card) return;
      openProductModal(card);
    });

    function openProductModal(card) {
      if (!modal) return;
      const name = card.dataset.productName || "";
      const desc = card.dataset.productDescription || "";
      const price = card.dataset.productPrice || "";
      const image = card.querySelector("img")?.src || "";
      const variantId = card.dataset.productVariantId || "";

      const titleEl = modal.querySelector(".modal-product-title, [data-modal-title]");
      const descEl = modal.querySelector(".modal-product-desc, [data-modal-desc]");
      const priceEl = modal.querySelector(".modal-product-price, [data-modal-price]");
      const imgEl = modal.querySelector(".modal-product-img, [data-modal-img]");
      const addBtn = modal.querySelector(".modal-add-to-bag, [data-modal-add]");

      if (titleEl) titleEl.textContent = name;
      if (descEl) descEl.textContent = desc;
      if (priceEl) priceEl.textContent = price;
      if (imgEl) imgEl.src = image;
      if (addBtn) {
        addBtn.onclick = () => {
          if (variantId) addToCart(Number(variantId), 1);
          closeProductModal();
        };
      }

      modal.classList.add("active");
      modalOverlay?.classList.add("active");
    }

    function closeProductModal() {
      if (modal) modal.classList.remove("active");
      modalOverlay?.classList.remove("active");
    }

    modalOverlay?.addEventListener("click", closeProductModal);
    modal?.querySelector(".modal-close, [data-modal-close]")?.addEventListener("click", closeProductModal);
  }

  /* =========================================================================
     6. Cake Customizer
     ========================================================================= */

  function initCakeCustomizer() {
    const customizer = document.querySelector(".cake-customizer, [data-cake-customizer]");
    if (!customizer) return;

    const BASE_PRICE = 2500; // AED 25.00 in cents

    const sizeSurchargeMap = {
      small: 0,
      medium: 1500,   // +15.00
      large: 3500,    // +35.00
      "extra-large": 6000, // +60.00
    };

    const DIETARY_SURCHARGE = 250; // 2.50 AED in cents

    const state = {
      flavour: "vanilla",
      size: "medium",
      frosting: "buttercream",
      dietary: { vegan: false, glutenFree: false, nutFree: false },
      inscription: "",
    };

    // Flavour selection
    customizer.querySelectorAll("[data-flavour]").forEach((btn) => {
      btn.addEventListener("click", () => {
        customizer.querySelectorAll("[data-flavour]").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.flavour = btn.dataset.flavour;
        updateCakePrice();
      });
    });

    // Size selection
    customizer.querySelectorAll("[data-size]").forEach((btn) => {
      btn.addEventListener("click", () => {
        customizer.querySelectorAll("[data-size]").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.size = btn.dataset.size;
        updateCakePrice();
      });
    });

    // Frosting style toggle
    customizer.querySelectorAll("[data-frosting]").forEach((btn) => {
      btn.addEventListener("click", () => {
        customizer.querySelectorAll("[data-frosting]").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.frosting = btn.dataset.frosting;
      });
    });

    // Dietary toggles
    customizer.querySelectorAll("[data-dietary]").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("selected");
        state.dietary[btn.dataset.dietary] = btn.classList.contains("selected");
        updateCakePrice();
      });
    });

    // Inscription
    const inscriptionInput = customizer.querySelector("[data-inscription]");
    const charCount = customizer.querySelector("[data-inscription-count]");
    if (inscriptionInput) {
      inscriptionInput.addEventListener("input", () => {
        state.inscription = inscriptionInput.value;
        if (charCount) charCount.textContent = `${inscriptionInput.value.length}/50`;
      });
    }

    // Price display
    const priceDisplay = customizer.querySelector("[data-cake-price]");

    function calculatePrice() {
      let total = BASE_PRICE;
      total += sizeSurchargeMap[state.size] || 0;
      Object.values(state.dietary).forEach((v) => {
        if (v) total += DIETARY_SURCHARGE;
      });
      return total;
    }

    function updateCakePrice() {
      if (priceDisplay) {
        priceDisplay.textContent = `AED ${(calculatePrice() / 100).toFixed(2)}`;
      }
    }
    updateCakePrice();

    // Submit to cart
    customizer.querySelector("[data-cake-add-to-cart], .cake-add-to-cart")?.addEventListener("click", async () => {
      const sizeSelect = customizer.querySelector("[data-size].selected");
      const variantId = Number(customizer.dataset.cakeVariantId || 0);
      if (!variantId) {
        console.warn("No cake variant ID configured on [data-cake-customizer]");
        return;
      }
      const notes = [
        `Flavour: ${state.flavour}`,
        `Size: ${state.size}`,
        `Frosting: ${state.frosting}`,
        `Dietary: ${Object.entries(state.dietary).filter(([, v]) => v).map(([k]) => k).join(", ") || "none"}`,
        state.inscription ? `Inscription: ${state.inscription}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
      await addToCart(variantId, 1, notes);
    });
  }

  /* =========================================================================
     7. About Timeline
     ========================================================================= */

  function initTimeline() {
    const timeline = document.querySelector(".about-timeline, [data-about-timeline]");
    if (!timeline) return;

    const buttons = timeline.querySelectorAll("[data-milestone-year]");
    const panels = timeline.querySelectorAll("[data-milestone-panel]");

    function showMilestone(year) {
      buttons.forEach((b) => b.classList.toggle("active", b.dataset.milestoneYear === year));
      panels.forEach((p) => {
        if (p.dataset.milestonePanel === year) {
          p.classList.add("active");
          p.style.maxHeight = p.scrollHeight + "px";
        } else {
          p.classList.remove("active");
          p.style.maxHeight = "0";
        }
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => showMilestone(btn.dataset.milestoneYear));
    });

    // Show first active or first button
    const initial = timeline.querySelector("[data-milestone-year].active") || buttons[0];
    if (initial) showMilestone(initial.dataset.milestoneYear);
  }

  /* =========================================================================
     8. Testimonials – Star Rating + Review Form
     ========================================================================= */

  function initTestimonials() {
    const section = document.querySelector(".testimonials-section, [data-testimonials]");
    if (!section) return;

    const form = section.querySelector(".review-form, [data-review-form]");
    if (!form) return;

    let selectedRating = 0;
    const starsContainer = form.querySelector(".star-rating-picker, [data-star-picker]");
    const ratingInput = form.querySelector("[data-rating-input]");
    const reviewList = section.querySelector(".review-list, [data-review-list]");

    if (starsContainer) {
      const stars = starsContainer.querySelectorAll("[data-star]");
      stars.forEach((star) => {
        star.addEventListener("mouseenter", () => {
          const val = Number(star.dataset.star);
          stars.forEach((s) => {
            s.classList.toggle("hovered", Number(s.dataset.star) <= val);
          });
        });

        star.addEventListener("click", () => {
          selectedRating = Number(star.dataset.star);
          if (ratingInput) ratingInput.value = selectedRating;
          stars.forEach((s) => s.classList.toggle("active", Number(s.dataset.star) <= selectedRating));
        });
      });

      starsContainer.addEventListener("mouseleave", () => {
        stars.forEach((s) => s.classList.remove("hovered"));
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = form.querySelector("[data-reviewer-name]");
      const textInput = form.querySelector("[data-review-text]");

      const name = nameInput?.value?.trim() || "Anonymous";
      const text = textInput?.value?.trim() || "";
      const rating = selectedRating || 5;

      if (!text) return;

      const starsHtml = Array.from({ length: 5 }, (_, i) => `<span class="star ${i < rating ? "active" : ""}">&#9733;</span>`).join("");

      const reviewHtml = `
        <div class="review-card">
          <div class="review-stars">${starsHtml}</div>
          <p class="review-text">"${escapeHtml(text)}"</p>
          <p class="review-author">&mdash; ${escapeHtml(name)}</p>
        </div>`;

      if (reviewList) reviewList.insertAdjacentHTML("afterbegin", reviewHtml);

      form.reset();
      selectedRating = 0;
      if (ratingInput) ratingInput.value = 0;
      starsContainer?.querySelectorAll("[data-star]").forEach((s) => s.classList.remove("active"));
    });
  }

  /* =========================================================================
     9. Location / Hours – Live Open/Closed Status
     ========================================================================= */

  function initLocationHours() {
    const statusEl = document.querySelector(".location-status, [data-location-status]");
    if (!statusEl) return;

    function isOpenNow() {
      const now = new Date();
      const dubai = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Dubai" })
      );
      const day = dubai.getDay(); // 0=Sun
      const hour = dubai.getHours();

      if (day === 5) return false; // Friday closed
      if (day === 0 || day === 6) return hour >= 9 && hour < 16; // Sat-Sun 09:00-16:00
      return hour >= 8 && hour < 18; // Mon-Thu 08:00-18:00
    }

    function updateStatus() {
      const open = isOpenNow();
      statusEl.textContent = open ? "We're Open Now" : "Currently Closed";
      statusEl.classList.toggle("is-open", open);
      statusEl.classList.toggle("is-closed", !open);
    }

    updateStatus();
    setInterval(updateStatus, 30000);
  }

  /* =========================================================================
     10. Newsletter Form
     ========================================================================= */

  function initNewsletter() {
    const form = document.querySelector(".newsletter-form, [data-newsletter-form]");
    if (!form) return;

    const successMsg = form.querySelector(".newsletter-success, [data-newsletter-success]");
    const errorMsg = form.querySelector(".newsletter-error, [data-newsletter-error]");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (successMsg) successMsg.style.display = "none";
      if (errorMsg) errorMsg.style.display = "none";

      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value?.trim();
      if (!email) return;

      // Shopify uses a standard form submission or custom endpoint.
      // Many themes POST to /contact with form_type=newsletter
      try {
        const fd = new FormData();
        fd.append("contact[email]", email);
        fd.append("form_type", "newsletter");
        fd.append("utf8", "\u2713");

        const response = await fetch("/contact#newsletter", {
          method: "POST",
          body: fd,
        });

        if (response.ok) {
          if (successMsg) successMsg.style.display = "block";
          if (emailInput) emailInput.value = "";
        } else {
          if (errorMsg) errorMsg.style.display = "block";
        }
      } catch {
        // Fallback: show success regardless (some stores redirect)
        if (successMsg) successMsg.style.display = "block";
        if (emailInput) emailInput.value = "";
      }
    });
  }

  /* =========================================================================
     11. Smooth Scroll for All Anchor Links
     ========================================================================= */

  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#" || href === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* =========================================================================
     Initialization
     ========================================================================= */

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initHeroCanvas();
    initMenuSection();
    initCakeCustomizer();
    initTimeline();
    initTestimonials();
    initLocationHours();
    initNewsletter();
    initSmoothScroll();

    // Cart event listeners
    document.querySelectorAll("[data-cart-open]").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openCartDrawer();
      })
    );
    document.querySelectorAll("[data-cart-close]").forEach((el) =>
      el.addEventListener("click", closeCartDrawer)
    );
    document.querySelector(".cart-drawer-overlay")?.addEventListener("click", closeCartDrawer);
  });

  // Expose cart functions globally so inline onclick handlers (if any) still work
  window.CrumbCo = {
    openCartDrawer,
    closeCartDrawer,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };
})();

window.addEventListener('load', function () {
  const cartCircle = document.querySelector('#cart-circle'),
  cartCount = document.querySelector('#cart-count')

  // фіксований хедер
  document.addEventListener('scroll', function () {
    const scrollFixed = document.querySelector(".fixed-navigation"),
      navigationHeader = document.querySelector(".navigation"),
      cartPosition = document.querySelector(".basket-cta"),
      mediaQuery = window.matchMedia('(max-width: 840px)')
  
    if (window.scrollY > 0) {
      scrollFixed.classList.add('scrolled')
      navigationHeader.style.top = "0"
      cartPosition.style.top = "10rem"

      if (mediaQuery.matches) {
        cartPosition.style.top = "35rem"
      }

    } else {
      scrollFixed.classList.remove('scrolled')
      navigationHeader.style.top = ""
      cartPosition.style.top = ""
    }
  })

  //паралакс ефект на скрол
  const parallaxBg = document.querySelector('.parallax-bg'),
    opacityBg = document.querySelector('.opacity-bg'),
    parallaxImage = document.querySelector('.paralax-image'),
    sensitivity = 100

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    parallaxBg.style.transform = `translateY(${scrollY * -0.5}rem)`
    opacityBg.style.transform = `translateY(${scrollY * -0.5}rem)`
  })

  //паралакс ефект на рух курсором мишки
  document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX,
      mouseY = e.clientY

    // Розрахунок руху паралакс-зображення
    const offsetX = mouseX / sensitivity,
      offsetY = mouseY / sensitivity

    //трансформація зображення
    parallaxBg.style.backgroundPosition = `${offsetX}rem ${offsetY}rem`
    opacityBg.style.backgroundPosition = `${offsetX}rem ${offsetY}rem`
    parallaxImage.style.backgroundPosition = `${offsetX}rem ${offsetY}rem`
  })


  //бургер меню
  const burger = document.querySelector(".burger"),
    mobileMenu = document.querySelector(".mobile-menu")

  burger.addEventListener('click', function () {
    this.classList.toggle('active'),
      mobileMenu.classList.toggle('activemobile')
  })

  function closeBurgerMenu() {
    burger.classList.remove('active');
    mobileMenu.classList.remove('activemobile');
  }

  // скролл до секцій
  const navLinks = [...document.querySelectorAll(".nav-menu")]

  navLinks.forEach(item => {
    item.addEventListener("click", evt => {
      evt.preventDefault()

      let id = evt.target.getAttribute("data-href"),
        targetSection = document.querySelector(id),
        targetOffset = targetSection.offsetTop + 20

      if (id) {
        let stopScroll = function stopScroll() {
          clearInterval(interval)
          window.removeEventListener("click", stopScroll)
          window.removeEventListener("mousewheel", stopScroll)
          window.removeEventListener("contextmenu", stopScroll)
        }
        const interval = setInterval(() => {
          window.addEventListener("click", stopScroll)
          window.addEventListener("mousewheel", stopScroll)
          window.addEventListener("contextmenu", stopScroll)
          const remainingDistance = targetOffset - window.scrollY,
            scrollStep = remainingDistance * 0.1,
            tolerance = 1
            
            if (Math.abs(remainingDistance) <= tolerance || Math.abs(scrollStep) <= tolerance) {
            clearInterval(interval)
          } else {
            window.scrollBy(0, scrollStep)
          }
        }, 30)
        closeBurgerMenu()
      }

    })
  })
  
  //scroll до блоків
  function animateSectionBlock() {
    const sectionBlocks = document.querySelectorAll("section")

    sectionBlocks.forEach(item => {
      const itemTop = item.getBoundingClientRect().top - 20,
        itemBottom = item.getBoundingClientRect().bottom - 20,
        windowHeight = window.innerHeight

      if (itemTop < windowHeight && itemBottom > 0) {
        item.style.opacity = 1
        item.style.transform = "translateX(0)"
      } else {
        item.style.opacity = 0
        item.style.transform = "translateY(100rem)" 
      }
    })
  }

  function handleScroll() {
    animateSectionBlock()
  }

  animateSectionBlock()
  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", animateSectionBlock)


  // карусель працівників
  const carousel = document.querySelector('.carousel'),
    prevButton = document.querySelector('#prevBtn'),
    nextButton = document.querySelector('#nextBtn')

  let items = [...document.querySelectorAll(".carousel-item")]

  const itemWidth = items[0].offsetWidth + 30

  let currentIndex = 0,
    isAnimating = false

  function updateCarousel() {
    while (carousel.firstChild) {
      carousel.removeChild(carousel.firstChild)
    }

    const firstClone = items[items.length - 1].cloneNode(true)
    firstClone.style.left = `-${itemWidth}rem`
    carousel.insertAdjacentElement("afterbegin", firstClone)

    for (let i = 0; i < items.length; i++) {
      const item = items[i].cloneNode(true)
      item.style.left = i * itemWidth + "rem"
      carousel.appendChild(item)
    }
    let socialWorks = [...document.querySelectorAll(".social-work")],
      figureWorker = document.querySelectorAll(".figure-workers")
  
    figureWorker.forEach((itemWorker, index) => {
      itemWorker.addEventListener("mouseenter", () => {
        socialWorks[index].style.display = "block"
      })
      
      itemWorker.addEventListener("mouseleave", () => {
        socialWorks[index].style.display = "none"
      })
    })
  }

  updateCarousel()

  function goToIndex(index) {
    isAnimating = true

    const distance = -index * itemWidth

    currentIndex = (currentIndex + items.length + index) % items.length

    carousel.style.transition = 'transform .5s ease-in-out'
    carousel.style.transform = `translateX(${distance}rem)`

    setTimeout(() => {
      carousel.style.transition = 'none'
      carousel.style.transform = 'none'
      isAnimating = false
      updateCarousel()
    }, 500)
  }

  nextButton.addEventListener('click', () => {
    items.push(items.shift())
    goToIndex(1)
  })

  prevButton.addEventListener('click', () => {
    items.unshift(items.pop())
    goToIndex(-1)
  })

  let touchStartX = 0,
    touchEndX = 0

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX
  })

  carousel.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX
  })

  carousel.addEventListener('touchend', () => {
    const touchDiff = touchStartX - touchEndX
    if (touchDiff > 50) {
      items.push(items.shift())
      goToIndex(1)
    } else if (touchDiff < -50) {
      items.unshift(items.pop())
      goToIndex(-1)
    }
  })

  //червоні блоки на картках
  const clickBlock = [...document.querySelectorAll(".img-cards")],
    textBlock = [...document.querySelectorAll(".text-block")],
    redBlock = [...document.querySelectorAll(".click-block")]

    
    clickBlock.forEach((clickBlock, index) => {

    function redBlockView() {
      redBlock[index].classList.toggle("active-red")
      textBlock[index].classList.toggle("active-text")
    }

    clickBlock.addEventListener('mouseenter', function () {
      redBlockView()
    })
    clickBlock.addEventListener('mouseleave', function () {
      redBlockView()
    })
  })

  // попап з блокам
  const openPopupButton = document.querySelector("#openPopupButton"),
    authPopup = document.querySelector("#authPopup"),
    dragArea = document.querySelector("#dragArea"),
    blocks = document.querySelectorAll(".block"),
    blockPlaces = document.querySelectorAll(".block-place"),
    statusMessage = document.querySelector("#statusMessage"),
    tryAgainButton = document.querySelector("#tryAgainButton"),
    closeButton = document.querySelector("#closeButton")

  let draggedBlock = null

  function checkAuthorization() {
    const [block1Place, block2Place, block3Place] = blockPlaces

    const isAuthorized =
      block1Place.contains(blocks[0]) &&
      block1Place.contains(blocks[3]) &&
      block1Place.contains(blocks[6]) &&
      block2Place.contains(blocks[1]) &&
      block2Place.contains(blocks[4]) &&
      block2Place.contains(blocks[7]) &&
      block3Place.contains(blocks[2]) &&
      block3Place.contains(blocks[5]) &&
      block3Place.contains(blocks[8])

    if (isAuthorized) {
      localStorage.setItem("authorized", "true")
      authPopup.style.display = "none"
      document.title = "Startup are welcome to you!"
      statusMessage.innerText = "Woo-hoo! You get it! Authorization successful! Welcome!"
    }
  }

  const isAuthorized = localStorage.getItem("authorized")

  if (isAuthorized === "true") {
    authPopup.style.display = "none"
    document.title = "Startup are welcome to you!"
    statusMessage.innerText = "Woo-hoo! You get it! Authorization successful! Welcome!"
  }

  openPopupButton.addEventListener("click", () => {
    authPopup.style.display = "block"
    checkAuthorization()
  })

  blocks.forEach(block => {
    block.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", block.getAttribute("data-order"))
      draggedBlock = block
    })

    block.addEventListener("touchstart", (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      draggedBlock = block
      block.style.position = 'fixed'
      block.style.left = touch.clientX - dragArea.getBoundingClientRect().left + 'rem'
      block.style.top = touch.clientY - dragArea.getBoundingClientRect().top + 50 + 'rem'
    }, false)

    block.addEventListener("touchmove", (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      block.style.position = 'fixed'
      block.style.left = touch.clientX - dragArea.getBoundingClientRect().left + 'rem'
      block.style.top = touch.clientY - dragArea.getBoundingClientRect().top + 50 + 'rem'
    }, false)

    block.addEventListener("touchend", (e) => {
      e.preventDefault()
      const blockPosition = block.getBoundingClientRect()

      blockPlaces.forEach(place => {
        const placePosition = place.getBoundingClientRect()

        if (blockPosition.left >= placePosition.left && blockPosition.left <= placePosition.right && blockPosition.top >= placePosition.top && blockPosition.top <= placePosition.bottom) {
          place.appendChild(block)
          block.style.position = "static"
          place.style.border = "2rem solid red"
          checkAuthorization()
        }
      })
    })
  })

  blockPlaces.forEach(place => {
    place.addEventListener("dragover", (e) => {
      e.preventDefault()
      place.style.border = "2rem solid red"
    })

    place.addEventListener("drop", () => {
      if (draggedBlock) {
        place.appendChild(draggedBlock)
        checkAuthorization()
      }
    })
  })

  tryAgainButton.addEventListener("click", () => {
    blocks.forEach(block => {
      block.style.position = 'static'
      dragArea.appendChild(block)
    })
    blockPlaces.forEach(place => {
      place.style.border = "none"
    })
    checkAuthorization()
  })

  closeButton.addEventListener("click", () => {
    authPopup.style.display = "none"
  })

  //сервіси зміна тексту і стилю
  const tripleClick = document.querySelector(".triple-click"),
    heading = document.querySelectorAll('p.personal')

  tripleClick.addEventListener("click", function (e) {
    heading.forEach(item => {
      if (e.detail === 3) {
        item.style.fontWeight = 'bold'
        item.style.color = '#c0301c'
        item.textContent = 'Hack This Site'
      }
    })
  })

  // зміна коментарів на радіокнопки
  const radioButtons = document.querySelectorAll('input[name="radio-coment"]'),
    comments = document.querySelectorAll('.coment')
  let currentIndexRadio = 0

  function switchComment(index) {
    radioButtons[index].checked = true
    comments.forEach((comment) => {
      comment.classList.remove('active')
    })
    comments[index].classList.add('active')
    currentIndexRadio = index
  }

  function startInterval() {
    return setInterval(() => {
      currentIndexRadio = (currentIndexRadio + 1) % radioButtons.length
      switchComment(currentIndexRadio)
    }, 3000)
  }

  let intervalRadio = startInterval()
  
  radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener('change', () => {
      clearInterval(intervalRadio)
      switchComment(index)
      intervalRadio = startInterval()
    })
  })


  // сортування карток товарів
  const btnProduct = document.querySelectorAll(".card-cta"),
    categories = ["branding", "design", "development", "strategy"],
    lastSelectedCategory = localStorage.getItem("lastSelectedCategory")

  let selectedCategory = lastSelectedCategory

  btnProduct.forEach(button => button.style.color = "#555")

  if (!lastSelectedCategory) {
    selectedCategory = "#all"
    localStorage.setItem("lastSelectedCategory", selectedCategory)
  }

  const selectedItem = document.querySelector(`[data-href="${selectedCategory}"]`)
  if (selectedItem) {
    selectedItem.style.color = "#c0301c"
    selectedItem.style.display = "flex"
  } else {

  }

  categories.forEach(category => {
    const elements = document.querySelectorAll(`.${category}`)
    elements.forEach(element => {
      element.style.display = selectedCategory === `#${category}` || selectedCategory === "#all" ? "flex" : "none"
    })
  })

  btnProduct.forEach(item => {
    item.addEventListener("click", evt => {
      evt.preventDefault()

      btnProduct.forEach(button => button.style.color = "#555")
      item.style.color = "#c0301c"

      let id = evt.target.getAttribute("data-href")

      localStorage.setItem("lastSelectedCategory", id)

      categories.forEach(category => {
        const elements = document.querySelectorAll(`.${category}`)
        elements.forEach(element => {
          element.style.display = id === `#${category}` || id === "#all" ? "flex" : "none"
        })
      })
    })

    // попап з текстом
    const btnReadMore = document.querySelectorAll(".readmore"),
      btnCancel = document.querySelectorAll(".btn-cancel"),
      desriptMore = document.querySelectorAll(".description-more")

    btnReadMore.forEach((item, index) => {
      item.addEventListener("click", function () {
        desriptMore[index].classList.add("visible")
        btnCancel[index].style.display = "block"
        item.style.display = "none"
      })
    })

    btnCancel.forEach((item, index) => {
      item.addEventListener("click", function () {
        desriptMore[index].classList.remove("visible")
        btnReadMore[index].style.display = "block"
        item.style.display = "none"
      })
    })

  })

  // карусель логотипів

  const carouselPartners = document.querySelector('.carousel-partners')

  let itemsImg = [...document.querySelectorAll(".partner-img")],
    itemImgWidth = itemsImg[0].offsetWidth,
    isAnimatingImg = false

  function updateCarouselImg() {

    while (carouselPartners.firstChild) {
      carouselPartners.removeChild(carouselPartners.firstChild)
    }

    itemsImg.unshift(itemsImg.pop())

    const firstImg = itemsImg[itemsImg.length - 1].cloneNode(true)
    firstImg.style.left = `-${itemImgWidth / 70}rem`
    carouselPartners.insertAdjacentElement("afterbegin", firstImg)

    for (let i = 0; i < itemsImg.length; i++) {
      const cloneImg = itemsImg[i].cloneNode(true)
      carouselPartners.appendChild(cloneImg)
    }
  }

  updateCarouselImg()

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {

      let distanceImg = itemImgWidth

      carouselPartners.style.transition = "transform .5s ease"
      carouselPartners.style.transform = `translateX(${distanceImg + 52}rem)`

      isAnimatingImg = true

      setTimeout(() => {
        carouselPartners.style.transition = "none"
        carouselPartners.style.transform = `translateX(0)`
        isAnimatingImg = false
        updateCarouselImg()
      }, 500)

    }, 2000)
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval)
  }

  carouselPartners.addEventListener('mouseenter', () => {
    stopAutoScroll()
  })

  carouselPartners.addEventListener('mouseleave', () => {
    startAutoScroll()
  })

  startAutoScroll()

  //попап підтверждення інформації

  const cancelPopap = document.querySelector(".cancel-popap"),
    autorizedPopap = document.querySelector(".autorized-popap"),
    submitForm = document.querySelector(".form-btn"),
    nameData = document.querySelector(".name-data"),
    mailData = document.querySelector(".mail-data"),
    subjectData = document.querySelector(".subject-data"),
    companyData = document.querySelector(".company-data"),
    okAutorization = document.querySelector(".ok")

  cancelPopap.addEventListener("click", () => {
    localStorage.removeItem('userRegistrationData')
    autorizedPopap.style.display = "none"
  })

  function confirmRegistration() {
    const name = document.querySelector('#name').value,
      email = document.querySelector('#mail').value,
      subject = document.querySelector('#subject').value,
      companyName = document.querySelector('#companyName').value

    localStorage.setItem('userRegistrationData', JSON.stringify({name, email, subject, companyName}))
  }

  submitForm.addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value,
      email = document.querySelector('#mail').value,
      subject = document.querySelector('#subject').value,
      companyName = document.querySelector('#companyName').value

    nameData.innerText = `Name: ${name}`
    mailData.innerText = `Email: ${email}`
    subjectData.innerText = `Subject: ${subject}`
    companyData.innerText = `Company Name: ${companyName}`
    autorizedPopap.style.display = "block"

    okAutorization.addEventListener("click", function () {
      confirmRegistration()
      autorizedPopap.style.display = "none"
    })
  })

  const userRegistrationData = JSON.parse(localStorage.getItem('userRegistrationData'))

  if (userRegistrationData) {
    document.querySelector('#name').value = userRegistrationData.name
    document.querySelector('#mail').value = userRegistrationData.email
    document.querySelector('#subject').value = userRegistrationData.subject
    document.querySelector('#companyName').value = userRegistrationData.companyName
  }

  // кошик
  const bascketOpen = document.querySelector("#basket-cta"),
    basket = document.querySelector(".basket-display"),
    cancelBasket = document.querySelector(".cancel-basket"),
    ctaBlock = document.querySelectorAll(".cta-block"),
    bcgCart = document.querySelector(".bcg-cart")

  bascketOpen.addEventListener("click", (e) => {
    e.preventDefault()
    basket.style.display = "block"
    bcgCart.classList.add("opacity-bgCart")
  })
  
  cancelBasket.addEventListener("click", (e) => {
    e.preventDefault()
    basket.style.display = "none"
    bcgCart.classList.remove("opacity-bgCart")

  })

  let cardBlock = {
    hair: {
        class: "branding",
        img: "img/hair.webp",
        alt: "hair",
        head: "Hair Dresser",
        descript: "Branding",
        price: "10$",
        datakey: "hair",
    },
    bird: {
        class: "branding",
        img: "img/bird.webp",
        alt: "bird",
        head: "Hope",
        descript: "Branding",
        price: "15$",
        datakey: "bird",
    },
    notebook: {
        class: "design",
        img: "img/notebook.webp",
        alt: "notebook",
        head: "Work place",
        descript: "Work place",
        price: "60$",
        datakey: "notebook",
    },
    photo: {
        class: "development",
        img: "img/photo.webp",
        alt: "photo",
        head: "Photo",
        descript: "Branding",
        price: "50$",
        datakey: "photo",
    },
    bycicle: {
        class: "development",
        img: "img/bycicle.webp",
        alt: "bycicle",
        head: "Bycicle",
        descript: "Branding",
        price: "40$",
        datakey: "bycicle",
    },
    note: {
        class: "strategy",
        img: "img/note.webp",
        alt: "note",
        head: "Work place",
        descript: "Branding",
        price: "25%",
        datakey: "note",
    },
    table: {
        class: "branding",
        img: "img/table.webp",
        alt: "table",
        head: "Work place",
        descript: "Branding",
        price: "30$",
        datakey: "table",

    },
    canceliaria: {
        class: "strategy",
        img: "img/canceliaria.webp",
        alt: "cancelaria",
        head: "Work",
        descript: "Branding",
        price: "15$",
        datakey: "canceliaria",
    },
    events: {
        class: "strategy",
        img: "img/events.webp",
        alt: "events",
        head: "Events",
        descript: "Branding",
        price: "35$",
        datakey: "events",
    }
  }

  const cart = {
    items: [],
    total: 0,
  }
  
  function addToCart(item) {
    const itemIndex = cart.items.findIndex((cartItem) => cartItem.datakey === item.datakey)
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity++
      updateCart()
      saveCartToLocalStorage(cart)
    } else {
      cart.items.push({ ...item, quantity: 1 })
      updateCart()
      saveCartToLocalStorage(cart)
    }
  }
  
  function removeFromCart(itemIndex) {
    if(cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity--
    } else {
      cart.items.splice(itemIndex, 1)
    }
    updateCart()
    saveCartToLocalStorage(cart)
  }
  
  function updateCart() {
    const cartItemsList = document.querySelector('#cart-items'),
      cartTotal = document.querySelector('#cart-total')
    cartItemsList.innerHTML = ''
  
    let total = 0
  
    cart.items.forEach((item, index) => {
      const listItem = document.createElement('p'),
        imgItem = document.createElement('img'),
        deleteElement = document.createElement('p'),
        plusElement = document.createElement('p'),
        countElementCarts = document.createElement('p'),
        payElementSum = document.createElement("p")

      countElementCarts.classList.add("card-pay")
  
      plusElement.classList.add("add-to-cart")
      plusElement.setAttribute('data-item-key', item.datakey)
      plusElement.textContent = "+"

      deleteElement.classList.add("remove-from-cart")
      deleteElement.setAttribute('data-item-index', index)
      deleteElement.textContent = "-"
  
      imgItem.style.width = "100rem"
      imgItem.src = item.img
      imgItem.alt = item.alt
      
      countElementCarts.textContent = `${item.quantity}`

      payElementSum.textContent = `${item.head} - ${item.price}`

      listItem.appendChild(imgItem)
      countElementCarts.appendChild(plusElement)
      countElementCarts.appendChild(deleteElement)
      listItem.appendChild(payElementSum)
      listItem.appendChild(countElementCarts)
      cartItemsList.appendChild(listItem)
      
      total += parseFloat(item.price.replace('$', '')) * item.quantity
      
    })
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart')
    
    addToCartButtons.forEach(addButton => {
      addButton.addEventListener('click', (e) => {
        e.preventDefault()
        const itemIndex = addButton.getAttribute('data-item-key')
        addToCart(cardBlock[itemIndex])
        price(cardBlock[itemIndex].price)
      })
    })

    cartTotal.textContent = `Загальна сума: $${total.toFixed(2)}`
    //кружечок із товарами
    if (cart.items.length > 0) {
      cartCircle.style.display = 'block'
      cartCount.textContent = cart.items.length
    } else {
      cartCircle.style.display = 'none'
    }

    const removeEl = document.querySelectorAll(".remove-from-cart")
  
    removeEl.forEach(itemEl => {
      itemEl.addEventListener('click', (e) => {
        e.preventDefault()
        const itemIndex = parseInt(itemEl.getAttribute('data-item-index'))
        removeFromCart(itemIndex)
      })
    })
  }
 
  function price(price) {
    const parsedPrice = parseFloat(price.replace('$', ''))
    cart.total += parsedPrice
    updateCart()
    saveCartToLocalStorage(cart)
  }
  
  ctaBlock.forEach((ctaAddBasket) => {
    ctaAddBasket.addEventListener("click", (e) => {
      e.preventDefault()
      const itemKey = ctaAddBasket.getAttribute("data-item-key"),
        imgClone = document.querySelectorAll(`.card-block-img[data-item-key="${itemKey}"`)[0]

      cloneImgCart = imgClone.cloneNode(true)
      document.body.appendChild(cloneImgCart)

      const cartPositionTop = bascketOpen.getBoundingClientRect().top,
        cartPositionLeft = bascketOpen.getBoundingClientRect().left,
        originalImgPosition = imgClone.getBoundingClientRect()
        console.log(cartPositionLeft, cartPositionTop);

      cloneImgCart.style.position = "fixed"
      cloneImgCart.style.zIndex = "7"
      cloneImgCart.style.left = originalImgPosition.left + "px"
      cloneImgCart.style.top = originalImgPosition.top + "px"
      cloneImgCart.style.transition = "3s";

      setTimeout(() => {
        cloneImgCart.style.left = cartPositionLeft - 165 + "px"
        cloneImgCart.style.top = cartPositionTop - 145 + "px"
        cloneImgCart.style.transform = "scale(0.1)"
      }, 10)

      setTimeout(() => {
        // cloneImgCart.style.display = "none";
        document.body.removeChild(cloneImgCart);
        addToCart(cardBlock[itemKey]);
        price(cardBlock[itemKey].price);
      }, 3000)
    })
  })
  
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  
  const savedCart = JSON.parse(localStorage.getItem('cart'))
  if (savedCart) {
    cart.items = savedCart.items
    cart.total = savedCart.total
    updateCart()
  }
  
  
})
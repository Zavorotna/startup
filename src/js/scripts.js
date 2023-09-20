window.addEventListener('load', function(){
  
  // фіксований хедер
  window.addEventListener('scroll', function () {
    const scrollFixed = document.querySelector(".fixed-navigation"),
      navigationHeader = document.querySelector(".navigation")
    if (window.scrollY > 0) {
      scrollFixed.classList.add('scrolled')
      navigationHeader.style.top = "0"
    } else {
      scrollFixed.classList.remove('scrolled')
      navigationHeader.style.top = ""
    }
  })

  //паралакс ефект на скрол
  const parallaxBg = document.querySelector('.parallax-bg'),
    opacityBg = document.querySelector('.opacity-bg'),
    parallaxImage = document.querySelector('.paralax-image'),
    parallaxContainer = document.querySelector('.parallax-header'),
    sensitivity = 100
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    parallaxBg.style.transform = `translateY(${scrollY * -0.5}px)`
    opacityBg.style.transform = `translateY(${scrollY * -0.5}px)`
  })

  //паралакс ефект на рух курсором мишки
  document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX,
      mouseY = e.clientY
   
    // Розрахунок руху паралакс-зображення
    const offsetX = mouseX / sensitivity,
      offsetY = mouseY / sensitivity
  
    // Застосовуємо трансформацію зображення
    parallaxBg.style.backgroundPosition = `${offsetX}rem ${offsetY}rem`
    opacityBg.style.backgroundPosition = `${offsetX}rem ${offsetY}rem`
    parallaxImage.style.backgroundPosition = `${offsetX}rem ${offsetY}rem`
  })
  
  
  //бургер меню
  const burger = document.querySelector(".burger"),
    mobileMenu = document.querySelector(".mobile-menu")
  
    burger.addEventListener('click', function() {
      this.classList.toggle('active'),
      mobileMenu.classList.toggle('activemobile')
    })

  // скролл до секцій
  const navLinks = [...document.querySelectorAll(".nav-menu")]

  navLinks.forEach(item => {
      item.addEventListener("click", evt => {
          evt.preventDefault()

          let id = evt.target.getAttribute("data-href"),
              targetSection = document.querySelector(id),
              targetOffset = targetSection.offsetTop + 40
              
          if (id) {
              let stopScroll = function stopScroll() {
                  clearInterval(interval)
                  window.removeEventListener("click", stopScroll)
                  window.removeEventListener("mousewheel", stopScroll)
                  window.removeEventListener("contextmenu", stopScroll)
                  console.log("stop")
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
          }
          
      })
  })
  //scroll до блоків
  function animateSectionBlock() {
    const sectionBlock = document.querySelectorAll("section")
  
    sectionBlock.forEach(item => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight
  
      if (itemTop < windowHeight / 2 && itemTop < 0) {
        item.style.opacity = 1
        item.style.transform = "translateX(0)"
      } else {
        item.style.opacity = 0
        item.style.transform = "translateY(20px)"
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
    nextButton = document.querySelector('#nextBtn'),
    items = [...document.querySelectorAll(".carousel-item")]
  let currentIndex = 0

  nextButton.addEventListener('click', () => {
      currentIndex++
      updateCarousel()
  })

  prevButton.addEventListener('click', () => {
      currentIndex--
      updateCarousel()
  })

  function updateCarousel() {
    const numVisible = 4,
      clones = []

    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild)
    }

    for (let i = currentIndex; i < currentIndex + numVisible; i++) {
        const cloneIndex = (i % items.length + items.length) % items.length,
          clone = items[cloneIndex].cloneNode(true)
        carousel.appendChild(clone)
        clones.push(clone)
    }

    const translateXValue = -clones.findIndex(clone => clone === carousel.firstElementChild) * (clones[0].offsetWidth + 30)
    carousel.style.transform = `translateX(${translateXValue}px)`
}
  
  //червоні блоки на картках
  const clickBlock = [...document.querySelectorAll(".img-cards")],
    textBlock = [...document.querySelectorAll(".text-block")],
    redBlock = [...document.querySelectorAll(".click-block")]
    console.log(clickBlock)

    clickBlock.forEach((clickBlock, index) => {
      clickBlock.addEventListener('click', function(){

        redBlock[index].classList.toggle("active-red")
        textBlock[index].classList.toggle("active-text")
      
      })
    
      // попап з блокам
      
  const openPopupButton = document.getElementById("openPopupButton")
    authPopup = document.getElementById("authPopup"),
    dragArea = document.getElementById("dragArea"),
    blocks = document.querySelectorAll(".block"),
    blockPlaces = [...document.querySelectorAll(".block-place")],
    statusMessage = document.getElementById("statusMessage")

    let draggedBlock = null

    // Функція для перевірки, чи виконані умови авторизації
    function checkAuthorizationConditions() {
        const block1Place = blockPlaces[0],
          block2Place = blockPlaces[1],
          block3Place = blockPlaces[2]

        if (block1Place.contains(blocks[0]) && block2Place.contains(blocks[1]) && block3Place.contains(blocks[2])) {
          authPopup.style.display = "none"
          document.title = "Startup are welcome to you!"
          statusMessage.innerText = "Woo-hoo! You get it! Authorization successful! Welcome!"
        } else {
          statusMessage.innerText = "Authorization error. Drag the blocks in the correct sequence."
          
        }
    }

    blocks.forEach(block => {
        block.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", block.getAttribute("data-order"))
            draggedBlock = block
        })
    })

    blockPlaces.forEach(place => {
        place.addEventListener("dragover", (e) => {
            e.preventDefault()
        })

        place.addEventListener("drop", (e) => {
            e.preventDefault()
            if (draggedBlock) {
                place.appendChild(draggedBlock)
                checkAuthorizationConditions()
            }
        })
    })
            
    openPopupButton.addEventListener("click", () => {
        authPopup.style.display = "block"
    })
  })

  //сервіси зміна тексту і стилю
    const cardFigures = document.querySelectorAll('.card-figure'),
      tripleClick = document.querySelector(".triple-click"),
      heading = document.querySelectorAll('p.personal')
  
      tripleClick.addEventListener("click", function(e) {
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
  
  function switchComment() {
      radioButtons[currentIndexRadio].checked = true
      comments.forEach((comment) => {
          comment.classList.remove('active')
      })
      comments[currentIndexRadio].classList.add('active')
  
      currentIndexRadio = (currentIndexRadio + 1) % radioButtons.length
  }
  
  const intervalRadio = setInterval(switchComment, 3000)
  
  radioButtons.forEach((radioButton, index) => {
      radioButton.addEventListener('change', () => {
          clearInterval(intervalRadio)
          currentIndexRadio = index
          switchComment()
      })
  })
  // сортування карток товарів
  const btnProduct = document.querySelectorAll(".card-cta"),
    categories = ["branding", "design", "development", "strategy"]
  
  btnProduct.forEach(item => {
    item.addEventListener("click", evt => {
      evt.preventDefault()
      btnProduct.forEach(button => button.style.color = "#555")
      item.style.color = evt.target === item ? "#c0301c" : "#555"
      let id = evt.target.getAttribute("data-href")
  
      categories.forEach(category => {
        const elements = document.querySelectorAll(`.${category}`)
        elements.forEach(element => {
          element.style.display = id === `#${category}` || id === "#all" ? "flex" : "none"
        })
      })
    })
  })
  
})

/**
 * зробити щоб перемикалося саме через сетінтервал
 * адаптив через бутстрап 
 * прописати data-filter фбо клас і відображати на клік лише ті товари які мають такі класи
 * 
 * 
 */


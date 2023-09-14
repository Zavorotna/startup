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
      parallaxImage = document.querySelector('.paralax-image')
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    parallaxBg.style.transform = `translateY(${scrollY * -0.5}px)`
    opacityBg.style.transform = `translateY(${scrollY * -0.5}px)`
  })
  
  const parallaxContainer = document.querySelector('.parallax-header'),
    parallaxProgect = document.querySelector('.progect-talk'),
    parallaxBgS = document.querySelector('.parallax-bg'),
    opacityBgS = document.querySelector('.opacity-bg'),
    sensitivity = 400
  //паралакс ефект на рух курсором мишки
  document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX + 20,
      mouseY = e.clientY + 20,
      mouseXPr = e.clientX,
      mouseYPr = e.clientY
  
    const containerRect = parallaxContainer.getBoundingClientRect(),
      containerWidth = containerRect.width,
      containerHeight = containerRect.height
    const containerRectPr = parallaxProgect.getBoundingClientRect(),
      containerWidthPr = containerRectPr.width,
      containerHeightPr = containerRectPr.height
  
    // Обмеження координати миші в межах контейнера
    mouseX = Math.max(Math.min(mouseX, containerWidth + 20), 20)
    mouseY = Math.max(Math.min(mouseY, containerHeight + 20), 20)
    mouseXPr = Math.max(Math.min(mouseXPr, containerWidthPr + 20), 20)
    mouseYPr = Math.max(Math.min(mouseYPr, containerHeightPr + 20), 20)
  
    // Розрахунок руху паралакс-зображення
    const offsetX = (containerWidth / 6 - mouseX) / sensitivity,
      offsetY = (containerHeight / 6 - mouseY) / sensitivity,
      offsetXPr = (containerWidthPr / 4 - mouseXPr) / sensitivity,
      offsetYPr = (containerHeightPr / 4 - mouseYPr) / sensitivity
  
    // Застосовуємо трансформацію зображення
    parallaxBgS.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    opacityBgS.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    parallaxImage.style.transform = `translate(${offsetXPr}px, ${offsetYPr}px)`
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
  
      if (itemTop < windowHeight / 2) {
        item.style.opacity = 1
        item.style.transform = "translateX(0)"
      } else {
        item.style.opacity = 0
        item.style.transform = "translateY(20px)"
      }
    });
  }
  
  function handleScroll() {
    animateSectionBlock()
  }
  
  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", animateSectionBlock)
  


  //карусель працівників  
  const carousel = document.querySelector('.carousel'),
    prevButton = document.querySelector('#prevBtn'),
    nextButton = document.querySelector('#nextBtn'),
    items = [...document.querySelectorAll(".carousel-item")]
    

  // Копіюємо перший блок в кінець, щоб зробити його безкінечним
  items.forEach((item, index) => {
    console.log(item, index)
    const clone = item.cloneNode(true);
    console.log(clone);
    carousel.appendChild(clone);
  }) 

  let currentIndex = 0,
    itemWidth = items[0].offsetWidth + 30

  nextButton.addEventListener('click', () => {
      currentIndex++
      if (currentIndex > items.length) {
          currentIndex = 0
      }
      updateCarousel()
  })

  prevButton.addEventListener('click', () => {
      currentIndex--
      if (currentIndex < 0) {
          currentIndex = items.length
      }
      updateCarousel()
  })

  function updateCarousel() {
      const translateXValue = -currentIndex * itemWidth;
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(${translateXValue}px)`;
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
  
      // сортування карток товару

  // const figureId = document.querySelectorAll(".figure"),
  //     cardCta = document.querySelectorAll(".card-cta")

  //   cardCta.forEach(items => () {
  //     items.addEventListener("click", function() {
  //       hair.style.display = "none"
  //     })
  //   })
  

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
    const cardFigures = document.querySelectorAll('.card-figure')
      cardFigures.forEach((cardFigure) => {
          const circle = cardFigure.querySelector('.circle'),
            heading = cardFigure.querySelector('p.personal')
  
          circle.addEventListener('click', () => {
            if (circle.classList.contains('active')) {
              circle.classList.remove('active');
              heading.textContent = 'Clean Typography';
              heading.style.fontWeight = 'normal';
              heading.style.color = 'initial';
            } else {
                // Увімкніть зміни, додавши клас "active"
                circle.classList.add('active');
                heading.textContent = 'Hack This Site'
                heading.style.fontWeight = 'bold'
                heading.style.color = '#c0301c'
            }
          })
    })
  // зміна коментарів на радіокнопки
  const radioButtons = document.querySelectorAll('input[name="radio-coment"]'),
    comments = document.querySelectorAll('.coment')
    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            const selectedCommentId = radioButton.value,
              selectedComment = document.getElementById(selectedCommentId)

            comments.forEach((comment) => {
                comment.classList.remove('active')
            })
            selectedComment.classList.add('active')
        })
    })
})  


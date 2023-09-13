window.addEventListener('load', function(){
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
      console.log(index)
      clickBlock.addEventListener('click', function(){

        redBlock[index].classList.toggle("active-red");
        textBlock[index].classList.toggle("active-text");
      
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
})
  








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
    const sectionBlocks = document.querySelectorAll("section");
  
    sectionBlocks.forEach(item => {
      const itemTop = item.getBoundingClientRect().top - 40;
      const itemBottom = item.getBoundingClientRect().bottom - 40;
      const windowHeight = window.innerHeight;
  
      if (itemTop < windowHeight && itemBottom > 0) {
        item.style.opacity = 1;
        item.style.transform = "translateX(0)";
      } else {
        item.style.opacity = 0;
        item.style.transform = "translateY(100px)"; // Змінив "translateY(50)" на "translateY(50px)"
      }
    });
  }
  
  function handleScroll() {
    animateSectionBlock();
  }
  
  animateSectionBlock();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", animateSectionBlock);
  

// карусель працівників
  const carousel = document.querySelector('.carousel'),
      prevButton = document.querySelector('#prevBtn'),
      nextButton = document.querySelector('#nextBtn'),
      items = document.querySelectorAll(".carousel-item")

  const itemWidth = items[0].offsetWidth + 30 

  let currentIndex = 0,
      isAnimating = false

  function updateCarousel() {
     while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
    const firstClone = items[items.length - 1].cloneNode(true)
    firstClone.style.left = `-${itemWidth}px`
    carousel.insertAdjacentElement("afterbegin", firstClone)
  
    for (let i = 0; i < items.length; i++) {
      const itemIndex = (i + currentIndex) % items.length
      const item = items[itemIndex].cloneNode(true)
      item.style.left = i * itemWidth + "px"
      carousel.appendChild(item)
    }        
  }

  updateCarousel()

  
  function goToIndex(index) {
    isAnimating = true
    
    const distance = -index * itemWidth
    
    currentIndex = (currentIndex + items.length + index) % items.length
   
    carousel.style.transition = 'transform .5s ease-in-out'
    carousel.style.transform = `translateX(${distance}px)`
    
    setTimeout(() => {
      carousel.style.transition = 'none'
      carousel.style.transform = 'none'
      isAnimating = false
      updateCarousel()
      }, 500)
  }

  nextButton.addEventListener('click', () => {
    goToIndex(1)
  })

  prevButton.addEventListener('click', () => {
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
      goToIndex(1)
    } else if (touchDiff < -50) {
      goToIndex(-1)
    }
  })

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
    authPopup.style.display = "none"
    document.title = "Startup are welcome to you!"
    statusMessage.innerText = "Woo-hoo! You get it! Authorization successful! Welcome!"
}
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
    const touch = e.touches[0]
    e.preventDefault()
    block.style.position = 'fixed'
    block.style.left = touch.clientX - dragArea.getBoundingClientRect().left + 'px'
    block.style.top = touch.clientY - dragArea.getBoundingClientRect().top + 50 + 'px'
  }, false)
  
  block.addEventListener("touchmove", (e) => {
    const touch = e.touches[0]
    e.preventDefault()
    block.style.position = 'fixed'
    block.style.left = touch.clientX - dragArea.getBoundingClientRect().left + 'px'
    block.style.top = touch.clientY - dragArea.getBoundingClientRect().top + 50 + 'px'
}, false)

})

blockPlaces.forEach(place => {
  place.addEventListener("touchend", () => {
    if (draggedBlock) {
      place.appendChild(draggedBlock)
      checkAuthorization()
    }
  })

  place.addEventListener("dragover", (e) => {
    e.preventDefault()
  })
  
  place.addEventListener("drop", (e) => {
    if (draggedBlock) {
      place.appendChild(draggedBlock)
      checkAuthorization()
    }
  })


})

tryAgainButton.addEventListener("touchstart", () => {
  blocks.forEach(block => {
      block.style.position = 'static'
      dragArea.appendChild(block)
  })
  checkAuthorization()
})

closeButton.addEventListener("click", () => {
  authPopup.style.display = "none"
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
  const btnProduct = document.querySelectorAll(".card-cta");
  const categories = ["branding", "design", "development", "strategy"];
  
  // Отримуємо останній вибір з локального сховища при завантаженні сторінки
  document.addEventListener("DOMContentLoaded", () => {
    const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  
    // Встановлюємо кольори кнопок
    btnProduct.forEach(button => button.style.color = "#555");
  
    // Визначаємо вибір за замовчуванням
    const defaultCategory = lastSelectedCategory || "#all";
  
    // Знаходимо відповідний елемент
    const selectedItem = document.querySelector(`[data-href="${defaultCategory}"]`);
  
    // Встановлюємо вибір за замовчуванням
    if (selectedItem) {
      selectedItem.style.color = "#c0301c";
    } else {
      // Якщо вибір за замовчуванням не знайдено, встановлюємо для "All"
      document.querySelector(`[data-href="#all"]`).style.color = "#c0301c";
    }
  
    // Встановлюємо відображення елементів
    categories.forEach(category => {
      const elements = document.querySelectorAll(`.${category}`);
      elements.forEach(element => {
        element.style.display = defaultCategory === `#${category}` || defaultCategory === "#all" ? "flex" : "none";
      });
    });
  });
  
  btnProduct.forEach(item => {
    item.addEventListener("click", evt => {
      evt.preventDefault();
  
      // Змінюємо кольори кнопок
      btnProduct.forEach(button => button.style.color = "#555");
      item.style.color = "#c0301c";
  
      let id = evt.target.getAttribute("data-href");
  
      // Зберігаємо останній вибір в локальному сховищі
      localStorage.setItem("lastSelectedCategory", id);
  
      categories.forEach(category => {
        const elements = document.querySelectorAll(`.${category}`);
        elements.forEach(element => {
          element.style.display = id === `#${category}` || id === "#all" ? "flex" : "none";
        });
      });
    });
  

  // попап з текстом
  const btnReadMore = document.querySelectorAll(".readmore"),
    btnCancel = document.querySelectorAll(".btn-cancel"),
    desriptMore = document.querySelectorAll(".description-more")
  
  btnReadMore.forEach((item, index) => {
    item.addEventListener("click", function() {
      desriptMore[index].classList.add("visible")
      btnCancel[index].style.display = "block"
      item.style.display = "none"
    })
  })
  
  btnCancel.forEach((item, index) => {
    item.addEventListener("click", function() {
      desriptMore[index].classList.remove("visible")
      btnReadMore[index].style.display = "block"
      item.style.display = "none"
    })
  })

})

// карусель логотипів
 
  const carouselPartners = document.querySelector('.carousel-partners'),
    itemsImg = document.querySelectorAll(".partner-img"),
    itemImgWidth = itemsImg[0].offsetWidth
  let currentIndexImg = 0
  let isAnimatingImg = false

  function updateCarouselImg() {
    carouselPartners.innerHTML = ''
    
    
    for (let i = 0; i < itemsImg.length; i++) {
      const cloneIndexImg = (i + currentIndexImg) % itemsImg.length,
        cloneImg = itemsImg[cloneIndexImg].cloneNode(true)
      cloneImg.style.left = i * itemImgWidth / 40 + "px"
      carouselPartners.insertAdjacentElement("afterbegin", cloneImg)
    }
    const firstImg = itemsImg[itemsImg.length - 1].cloneNode(true)
    firstImg.style.left =  `-${itemImgWidth / 70}px`
    carouselPartners.insertAdjacentElement("afterbegin", firstImg)
  }

  updateCarouselImg()

  function startAutoScroll(index) {
    setInterval(() => {
      if (!isAnimatingImg) {
        currentIndexImg = (currentIndexImg + 1) % itemsImg.length
        let distanceImg = index + itemImgWidth

        carouselPartners.style.transition = "transform .5s ease"
        carouselPartners.style.transform = `translateX(${distanceImg + 52}px)`

        isAnimatingImg = true;

        setTimeout(() => {
          carouselPartners.style.transition = "none"
          carouselPartners.style.transform = `translateX(0)`
          isAnimatingImg = false
          updateCarouselImg()
        }, 500)
      }
    }, 2000)
  }

  startAutoScroll(currentIndexImg + 1)

  
})

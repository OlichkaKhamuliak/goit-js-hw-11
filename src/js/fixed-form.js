const backgroundElement = document.querySelector('.form-container');

// Початковий колір (darkcyan) та прозорість
const initialColor = [0, 139, 139];

window.addEventListener('scroll', function() {
  // Отримання висоти прокрутки сторінки
  const scrollY = window.scrollY;

  // Визначення прозорості від висоти прокрутки
  const opacity = Math.min(0.5, scrollY / 20); // Максимальна прозорість 50%

  // Встановлення стилів фону з урахуванням прозорості та кольору
  if (scrollY === 0) {
    backgroundElement.style.transition = 'background-color 0.3s ease-in-out'; // Плавний перехід протягом 0.3 секунд
    backgroundElement.style.backgroundColor = `rgba(${initialColor.join(', ')}, 1)`;
  } else {
    backgroundElement.style.transition = 'background-color 0.3s ease-in-out'; // Плавний перехід протягом 0.3 секунд
    backgroundElement.style.backgroundColor = `rgba(${initialColor.join(', ')}, ${opacity})`;
  }
});

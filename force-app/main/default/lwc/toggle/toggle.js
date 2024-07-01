function toggleHomePage() {
  const toggleSwitch = document.getElementById('homeToggle');
  const toggleText = document.getElementById('toggleText');
  const homePage1 = document.getElementById('homePage1');
  const homePage2 = document.getElementById('homePage2');
 
  if (toggleSwitch.checked) {
    toggleText.innerText = 'Switch to Home Page 1';
    homePage1.classList.remove('active');
    homePage2.classList.add('active');
  } else {
    toggleText.innerText = 'Switch to Home Page 2';
    homePage1.classList.add('active');
    homePage2.classList.remove('active');
  }
}
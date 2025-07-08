let summaryCollection = document.getElementsByTagName('summary');
let signsCollection = document.getElementsByClassName('faq-open-icon');

for(let i = 0; i < summaryCollection.length; i++) {
  summaryCollection[i].onclick = function() {
    if(signsCollection[i].innerHTML === '+') signsCollection[i].innerHTML = '—';
    else signsCollection[i].innerHTML = '+';
  }
}
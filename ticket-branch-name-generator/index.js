const selection = document.querySelector('[data-select]');
let taskType = selection.options[selection.selectedIndex].value;
selection.addEventListener('change', function(e){
  taskType = e.currentTarget.options[e.currentTarget.selectedIndex].value;
})

const button = document.querySelector('[data-button-generator]');
const output = document.querySelector('[data-text-output]');
const copyToClipboard = document.querySelector('[data-button-copy]');
copyToClipboard.style.display = 'none';
output.style.display = 'none';

button.addEventListener('click', fetchData);

copyToClipboard.addEventListener('click', function(){
  if(output.innerText){
    navigator.clipboard.writeText(output.innerText);
    const textIsCopied = new Event('textCopied');
    document.dispatchEvent(textIsCopied);
  }
})

document.addEventListener('textGenerated', function(){
  copyToClipboard.style.display = 'block';
  output.style.display = 'block';
})

document.addEventListener('textCopied', function(){
  copyToClipboard.innerText = 'Copied ✔';
})


function fetchData(){
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {event: "fetchData"}, (response) => {
      if(response){
        const formattedText = `${taskType}/${JSON.parse(response.replace(/\s/g, '-').toLowerCase())}`;
        output.innerHTML = `<h3>${formattedText}</h3>`;
        const textIsGenerated = new Event('textGenerated');
        document.dispatchEvent(textIsGenerated);
      }
    });
  });
}

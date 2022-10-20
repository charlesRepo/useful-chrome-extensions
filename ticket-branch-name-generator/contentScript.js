chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.event === "fetchData") {
      const ticketTitle = document.querySelector("h1#summary-val");
      const URI = window.location.pathname;
      const isTicketURI = URI.match(/^\/browse\/MW-\d{1,10}$/g)
      const ticketNumber = isTicketURI ? URI.split('/')[2]:'';
      if(ticketTitle && ticketNumber)
       sendResponse(JSON.stringify(`${ticketNumber}-${ticketTitle.innerText}` ));
    }
  }
);
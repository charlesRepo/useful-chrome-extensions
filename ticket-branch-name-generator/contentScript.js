chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.event === "fetchData") {
      const sidePageTicketNumber = document.querySelector('#issuekey-val > a');
      const isTicketURI = window.location.pathname.match(/^\/browse\/MW-\d{1,10}$/g);
      const isSidePageURI = window.location.search.includes('projectKey=MW&view=detail');
      const ticketTitle = document.querySelector("#summary-val")?.innerText;

      let ticketNumber = ''
      isTicketURI && (ticketNumber = window.location.pathname.split('/')[2]);
      isSidePageURI && (ticketNumber = sidePageTicketNumber?.innerText);

      if(ticketTitle && ticketNumber){
        sendResponse(JSON.stringify(`${ticketNumber}-${ticketTitle}`));
      }
    }
  }
);
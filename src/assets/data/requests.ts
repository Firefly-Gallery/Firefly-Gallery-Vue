export function AJAX(method:string, url:string, callback:(status:number, response:string, url:string)=>void) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 0) {
        console.error(`${method} ${new URL(url).pathname} Unknown Error, are you online?`);
      } else if(xhr.status == 200) {
        callback(xhr.status, xhr.responseText, xhr.responseURL);
      } else {
        try {
          const errorMsg = JSON.parse(xhr.responseText)["message"]
          console.error(`${method} ${new URL(url).pathname} Error ${xhr.status}: ${errorMsg}`);
        } catch {
          console.error(`${method} ${new URL(url).pathname} Error ${xhr.status}: ${xhr.responseText}`);
        }
      }
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
}
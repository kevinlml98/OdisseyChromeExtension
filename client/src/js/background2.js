console.log('bg2 ready')

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, response)
{
    if(msg.intended === 'handler')
    {
    console.log('bg2 ' + msg.txt);

    if (msg.txt == "Hello from the other side")
    {
        let mssg = {
            txt: ' bg2 Hello darkness my old friend'
        }
        
        chrome.runtime.sendMessage(mssg);
    }
    else if(msg.txt == "videoPlay")
    {
        player.playVideo();
    }else if(msg.txt == "videoPause")
    {
        player.pauseVideo();
    }
}
}
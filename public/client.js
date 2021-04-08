const socket = io('/')

const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer(undefined, {

    host: '/',
   
    port: "3001"
  })

const myVideo = document.createElement('video')

myVideo.muted = true

navigator.mediaDevices.getUserMedia({

    audio :true,

    video:true

}).then(stream => {

    addVideoStream(myVideo , stream)

    socket.on('user-connected' , userId => {
        connectNewUser(userId , stream)
    })

})

myPeer.on('open' , id => 
{   
     socket.emit('join-room' , roomId , id )
})

socket.on('user-connected' , userId => {
    console.log('userId = ' + userId)
})
function connectNewUser(userId , stream)
{
        const call = myPeer.call(userId,stream)

        const video = document.createElement('video')

        call.on('stream' , userVideoStream  => {
            addVideoStream(video , stream)
        })
        call.on('close' , () => {
            video.remove()
        })
    }
function addVideoStream(video , stream)
{
    video.srcObject = stream
    video.addEventListener('loadedmetadata' , () => 
    {
        video.play()
    })

    videoGrid.append(video)
}
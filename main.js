var prediciton = "";

Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("Webcam_view");
Webcam.attach('#Webcam_view');

function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("Snap_view").innerHTML = "<img id='snap_pic' src ="+data_uri +">"
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YMZ9iPUJA/model.json', ModelLoaded);

function ModelLoaded(){
    console.log("Model locked and loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The hand gesture is" + prediciton;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    var Captured_image = document.getElementById("snap_pic");
    classifier.classify(Captured_image, gotresults);
}
function gotresults(error, results){
    if(error){
        console.error(error)
    }
    else {
        prediciton = results[0].label;
        document.getElementById("result_hand_gesture").innerHTML = prediciton;
        speak();
        if(prediciton == "thumbs up"){
            document.getElementById("result_hand_gesture_emoji").innerHTML = "&#128077;";
        }
        else if (prediciton == "gun symbol"){
        document.getElementById("result_hand_gesture_emoji").innerHTML = "&#128072;";
        }
       else if (prediciton == "victory symbol"){
           document.getElementById("result_hand_gesture_emoji").innerHTML = "&#9996;";
       }
}
}
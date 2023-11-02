const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function circleMouseFollower(xscale, yscale){
    window.addEventListener('mousemove', function(dets){
        document.querySelector('.mini-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}


function firstPageAnimation(){
    var timeline = gsap.timeline();

    timeline.from('nav',{
        y: '-10',
        opacity : 0,
        duration : 1.5,
        ease: Expo.easeInOut
    })

    .to('.boundingelem',{
        y: 0,
        ease: Expo.easeInOut,
        delay: -1,
        duration: 1.3,
        stagger: .3
    })

    .from('.footer',{
        // y: '-10',
        opacity : 0,
        duration : 1,
        delay: -0.97,
        ease: Expo.easeInOut
    })
}


function skewPointer(){
    var timeout;
    var xscale = 1;
    var yscale  = 1;

    var xprevious = 0;
    var yprevious = 0;

    window.addEventListener('mousemove', function(dets){

        xscale = gsap.utils.clamp(0.8,1.5,dets.clientX - xprevious);
       yscale = gsap.utils.clamp(0.8,1.5,dets.clientY - yprevious);

        xprevious = dets.clientX; 
        yprevious = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = timeout = setTimeout(function(){
            document.querySelector('.mini-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
          });

    });
}


gsap.utils.toArray(".elements").forEach((el) => {
  
    const image = el.querySelector("img.pic"),
          setX = gsap.quickSetter(image, "x", "px"),
          setY = gsap.quickSetter(image, "y", "px"),
          align = e => {
            const top = el.getBoundingClientRect().top;
            setX(e.clientX );
            setY(e.clientY - top);
          },
          startFollow = () => document.addEventListener("mousemove", align),
          stopFollow = () => document.removeEventListener("mousemove", align),
          fade = gsap.to(image, {autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow});
    
    el.addEventListener('mouseenter', (e) => {
      fade.play();
      startFollow();
      align(e);
    });
    
    el.addEventListener('mouseleave', () => fade.reverse());
   
  });

document.querySelectorAll(".elements").forEach(function(elem){
    var rotate = 0;
    var diff = 0;
    elem.addEventListener("mousemove", function(dets){
       diff = dets.clientX - rotate;
       rotate = dets.clientX;

       gsap.to(elem.querySelector("img.pic"),{
        rotate: gsap.utils.clamp(-20,20,diff)
       });
    });
});


// ------------------------------------------------------------------------
function startTime() {
    const today = new Date();
    let y = today.getFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    document.getElementById('year').innerHTML =  y + " &copy;";

    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }



skewPointer();
circleMouseFollower();
firstPageAnimation();

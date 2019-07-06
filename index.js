  // Component to change to a sequential color on click.
  AFRAME.registerComponent('about-box-cursor-listener', {
      init: function () {
          var increment = 120;
          var last = 0
          this.el.addEventListener('click', function (evt) {
              animateRotationFor(last, last+increment)
              last += increment
              this.emit("rotate-billboard");
              
              // this.components.rotation.data.y = (this.components.rotation.data.y  - 120) % 360
              // this.components.rotation.update(); // make the component notify everyone of the new rotation
        //console.log('I was clicked at: ', evt.detail.intersection.point);
    });
}
});

const showContact = () => {
    const contact = document.querySelector(".contacts");
    if(contact.style.display !== "block") {
        contact.style.display = "block";
    }
    else {
        contact.style.display = "none";
    }

}

AFRAME.registerComponent('project-link', {
   schema: {
       num: {type: 'string', default:'1'}
   },

   init: function () {
       let num = this.data.num;
       let animated = this.el.components.position;
        this.el.addEventListener('click', function() {
            window.location.href = `project.html#${num}`;
        })
        this.el.addEventListener("mouseenter", function() {
            animated.data.z -= 1;
            animated.update();
        });
        this.el.addEventListener("mouseleave", function() {
            animated.data.z += 1;
            animated.update();
        })
   }
});


AFRAME.registerComponent('raycaster-autorefresh', {
    init: function () {
        var el = this.el;
        this.el.addEventListener('model-loaded', function () {
            var cursorEl = el.querySelector('[raycaster]');
            cursorEl.components.raycaster.refreshObjects();
        });
    }
});

const initUpdateNavbarOnScroll = () => {
    const navbar = document.querySelector('.container-1');
    const elements = document.querySelectorAll('a');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= window.innerHeight-navbar.offsetHeight) {
                navbar.classList.add('new-class');
                [].slice.call(elements).forEach(function(elem) {
                    //elem.style.color = "rgb(59, 67, 70)";
                    elem.classList.add('blue');
                });
            } else {
                navbar.classList.remove('new-class');
            }
        });
    }
}

const initScrolling = () => {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if (scrollY <=0 && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1 ){
            e.preventDefault();
        }
    }, false);
}

const change = () => {
    const image = document.getElementById('change-img');
    image.src = "assets/cards/finals.png";
}

const cameraLocation = (position, rotation) => {
    const skyEl = document.querySelector('#background');
    const camera = document.querySelector('#cameraRig');
    // camera.object3D.position.set(position.x, position.y, position.z)
    // camera.components.position.data = position;
    // camera.components.rotation.data = rotation;
    const currentCameraRotation = camera.components.rotation.data;
    const currentCameraPosition = camera.components.position.data;
    
    const rotationAnimation = document.querySelector("#cameraRotationAnimation");
    rotationAnimation.data.from = `${currentCameraRotation.x} ${currentCameraRotation.y} ${currentCameraRotation.z}`;
    rotationAnimation.data.to = `${rotation.x} ${rotation.y} ${rotation.z}`;
    
    const positionAnimation = document.querySelector("#cameraPositionAnimation")
    positionAnimation.data.from = `${currentCameraPosition.x} ${currentCameraPosition.y} ${currentCameraPosition.z}`;
    positionAnimation.data.to = `${position.x} ${position.y} ${position.z}`;
    
    camera.emit("navimove");
    
    // console.log(ANIMATION_HTML);
    // camera.innerHTML += ANIMATION_HTML;
    document.activeElement.blur() // return to the default activeElement;
    camera.updateComponent("wasd-controls");
}

const initPage = () => {
    initUpdateNavbarOnScroll();
    // document.querySelector("a-scene").addEventListener("renderstart", centralizeAllTriangles);
    //cubeRotation();
}


const updatePositionComponent = (components, diff) => {
    components.position.data.x += diff.x;
    components.position.data.y += diff.y;
    components.position.data.z += diff.z;
    components.position.update();
}

const getObjectCenter = (obj) => {
    var mesh = obj.children[0]
    while (mesh.children.length > 0) {
        mesh = mesh.children[0];
    }
    mesh.geometry.computeBoundingBox();
    return obj.localToWorld(mesh.geometry.boundingBox.center())
    
}

const centralizeSingleTriangle = (tri) => {
    var inner = tri.getChildEntities()[0];
    var box = new THREE.Box3().setFromObject(inner.object3D);
    if (!isFinite(box.min.x) || isNaN(box.min.x)) {
        return false;
    }
    var center = getObjectCenter(inner.object3D);
    var diff = new THREE.Vector3().copy(center);
    var parentLoc = new THREE.Vector3(tri.parentEl.components.position.data.x, tri.parentEl.components.position.data.y, tri.parentEl.components.position.data.z);
    diff = diff.sub(parentLoc)
    updatePositionComponent(tri.components, diff)
    updatePositionComponent(inner.components, diff.multiplyScalar(-1));
    return true;
}

const animateRotationFor = (from, to) => {
    animations = document.querySelectorAll("#tri-animation");
    animations.forEach((a) => {
        a.update()
        
        a.data.from = "0 " + from + " 0"
        a.data.to = "0 " + to  + " 0";
        a.data.dur = 1000;
    });
    
}

AFRAME.registerComponent("triangle-centrelizer", {
    init: function() {this.done = false; },
    tock: function() {
        if (!this.done) {this.done = centralizeSingleTriangle(this.el); }  }
    });
    
    
    AFRAME.registerComponent('stack', {
        init: function () {
            this.el.addEventListener('click', function (evt) {
                    window.location.href = "http://stackoverflow.com";
            });
        }
    });

      
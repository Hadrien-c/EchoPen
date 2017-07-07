$(document).ready(function(){

  var $vid = $('#webdoc-video')[0], //Video object
  $body = $('body'), //Body
  pause, //First pause param
  $points = $('.webdoc-pointVideo'), //All points
  $first = $('#webdoc-part1'), //First point
  $partContainerText = $('#webdoc-content'), //Slides container
  classHidden = 'webdoc-hidden', //Class toggle slide
  classBodyHidden = 'webdoc-inactive'; //Class toggle body

  var bindVideo = function($point,$id){

    //Listen video progress until to data and unbind event
    $('#webdoc-video').bind('timeupdate',function(evt){
      var pointActive = $('.webdoc-pointActive');
      setText($id);
      if($(this)[0].currentTime >= pause) {
        $(this)[0].pause();
        $(this).unbind(evt);
        var next = $($point).next('.webdoc-pointVideo');
        //Go to next point if isn't last one
        if(next.length){
          activePoint(next);
        }else{
          console.log('end');
        }
      }
    });
  }

  var toggle = function(status){
    var $ele = $partContainerText;
    //Toggle visibility of slide text depending on status param
    if(status == 'hide' && !$ele.hasClass(classHidden)){
      $ele.addClass(classHidden);
    }else if(status == 'show' && $ele.hasClass(classHidden)){
      $ele.removeClass(classHidden);
    }else if(status == 'toggle'){
      if(!$ele.hasClass(classHidden)){
        $ele.addClass(classHidden);
        $body.addClass(classBodyHidden);
      }else{
        $ele.removeClass(classHidden);
        $body.removeClass(classBodyHidden);
      }
    }
  }

  var activePoint = function($point){
    
    //Add class active to current li
    $points.removeClass('webdoc-pointActive');
    $point.addClass('webdoc-pointActive');

    //Retrieve data params from point
    var id = $point[0].id,
    from = $point.data('from');
    pause = $point.data('to');

    //Move video to data from point
    $vid.currentTime = parseInt(from);

    bindVideo($point,id);
    
    if($vid.paused) {
      $vid.play();
    }
  }

  var setText = function($id){
    //Add class active to current slide
    $('.webdoc-slide').addClass('webdoc-hidden');
    $('.'+$id+'Slide').removeClass('webdoc-hidden');
  }

  //Verify if click is outside timeline and toggle slide visibility
  $(document).on('click','#webdoc-overlay',function(event){
    var $target = $(event.target);
    if(!$target.hasClass('webdoc-timelineContainer') && !$target.hasClass('webdoc-pointVideo')){
      console.log('jlhaf');
      toggle('toggle');
    }
  });

  //Active point on click
  $('.webdoc-pointVideo').on('click',function(){
    activePoint($(this));
  });

  var init = function(){
    activePoint($first);
    $body.addClass(classBodyHidden);
  }

});
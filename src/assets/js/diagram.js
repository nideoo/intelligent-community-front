
let relation = {
  radius:220,
  boxW:600,
  boxH:600,
  hostW:180,
  hostH:175,
  guestW:80,
  guestH:80,
  relationW:80,
  relationH:40,
  angle:0,
  id:"box",
  init:function(array,n){//传入参数1：数组 参数2：第几个
    this.array = array;
    this.appendHost(this.array,n);
    this.appendQuest(this.array,n);
    this.appendRelationShip(this.array,n);
  },
  appendHost:function(array,n){
    var box = $("#"+this.id);
    var host = "<span class='host'>"+array[n].name+"</span>";
    box.append(host);
    this.postHost();
  },
  postHost:function(){
    var x = (this.boxW - this.hostW)/2;
    var y = (this.boxH - this.hostH)/2;
    $(".host").css({
      left:x,
      top:y
    })
  },
  appendQuest:function(array,n){
    var box = $("#"+this.id);
    var guests="";
    var that = this;
    for(var i=0; i<  array[n].friend.length; i++){
      guests+="<span class='guest'>"+array[n].friend[i].name+"</span>";
    }

    $(guests).appendTo(box);
    $('#box').on('click','.guest',function () {
      that.move(that,this);
    });
    this.postQuest();
  },
  postQuest:function(){
    var guests = $(".guest");
    var that = this;
    guests.each(function(i){
      guests.eq(i).css({
        left:that.setQuestPose(guests.length,that.radius,i,that.guestW,that.guestH,that.angle).left,
        top:that.setQuestPose(guests.length,that.radius,i,that.guestW,that.guestH,that.angle).top
      }).attr("angle",i/guests.length)
    })
  },
  setQuestPose:function(n,r,i,w,h,d){
//n:代表共几个对象 r代表周长 i代表第几个对象
//w代表外面对象的宽带 h代表外面对象的高度 d代表其实角度
    var p = i/n*Math.PI*2+Math.PI*2*d;
    var x = r * Math.cos(p);
    var y = r * Math.sin(p);
    return {
      "left":parseInt(this.boxW/2+ x - w/2),
      "top":parseInt(this.boxH/2 + y - h/2)
    }
  },
  appendRelationShip:function(array,n){
    var box = $("#"+this.id);
    var relation="";
    for(var i=0; i<array[n].friend.length; i++){
      relation+="<span class='relationship'>"+array[n].friend[i].relationship+"</span>";
    }
    box.append(relation);
    this.postRelationShip();
  },
  postRelationShip:function(){
    var guests = $(".relationship");
    var that = this;
    guests.each(function(i){
      guests.eq(i).css({
        left:that.setQuestPose(guests.length,that.radius/2,i,that.relationW,that.relationH,that.angle).left,
        top:that.setQuestPose(guests.length,that.radius/2,i,that.relationW,that.relationH,that.angle).top
      })
    })
  },
  move:function(t,i){
    var n = $(".guest").index($(i));
    this.angle = parseFloat($(i).attr("angle"))+0.5;
    this.delect(n);
    this.moveHost(i);
    this.moveQuest(i);
    this.moveRelationship(i);
    this.changeClass();
    setTimeout(function(){t.newAppend(i)},500);
  },
  newAppend:function(i){
    this.newAppendGuest(i,"guest","name",this.guestW,this.guestH,this.radius);
    this.newAppendGuest(i,"relationship","relationship",this.relationW,this.relationH,this.radius/2);
  },

  newAppendGuest:function(i,className,name,w,h,r){
    var host = $(i).html();
    var guest = $(".guest").html();
    var box = $("#"+this.id);
    var that = this;
    var next=0;
    for(var i=0; i<this.array.length; i++){
      if(host == this.array[i].name){
        for(var j=0;j<this.array[i].friend.length; j++){
          if(guest !== this.array[i].friend[j].name){
            next++;
            var guests ="<span class='"+className+"'>"+this.array[i].friend[j][name]+"</span>";
            $(guests).appendTo(box).css({
              left:that.setQuestPose(this.array[i].friend.length,r,next,w,h,that.angle).left,
              top:that.setQuestPose(this.array[i].friend.length,r,next,w,h,that.angle).top
            }).attr("angle",that.angle+next/this.array[i].friend.length).hide().fadeIn(1000);
          }
        }
      }
    }
  },

  moveHost:function(i){
    var hLeft = parseInt($(".host").css("left")) + this.hostW/2;
    var hTop = parseInt($(".host").css("top")) + this.hostH/2;
    var gLeft = parseInt($(i).css("left")) + this.guestW/2;
    var gTop = parseInt($(i).css("top")) + this.guestH/2;
    var l = gLeft - hLeft;
    var t = gTop - hTop;
    var left = (hLeft - l - this.guestW/2)+"px";
    var top = (hTop - t - this.guestH/2)+"px";
    this.animate(".host",left,top);
  },
  moveRelationship:function(i){
    var hLeft = parseInt($(".host").css("left")) + this.hostW/2;;
    var hTop = parseInt($(".host").css("top")) + this.hostH/2;
    var gLeft = parseInt($(".relationship").css("left")) + this.relationW/2;
    var gTop = parseInt($(".relationship").css("top")) + this.relationH/2;
    var l = gLeft - hLeft;
    var t = gTop - hTop;
    var left = (hLeft - l - this.relationW/2)+"px";
    var top = (hTop - t - this.relationH/2)+"px";
    this.animate(".relationship",left,top);
  },
  moveQuest:function(i){
    var left = $(".host").css("left");
    var top = $(".host").css("top");
    this.animate(i,left,top);
  },
  delect:function(n){
    $(".guest").slice(0,n).remove();
    $(".guest").slice(1).remove();
    $(".relationship").slice(0,n).remove();
    $(".relationship").slice(1).remove();
  },
  animate:function(i,left,top){
    $(i).animate({
      left:left,
      top:top
    },500);
  },
  changeClass:function(){
    var that =this;
    $(".guest").addClass("abcdef").removeClass("guest");
    $(".host").addClass("guest").removeClass("host").attr("angle",that.angle);
    $(".abcdef").addClass("host").removeClass("abcdef").attr("angle",null);
  }
};
export default relation

// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var rails_form = function(rails_token, url) {
  var form = new Element('form', {action: url, method: 'post'});

  var hidden = new Element('input', {type: 'hidden', value: rails_token, name: 'authenticity_token'});
  form.appendChild(hidden);

  return form;
}

// 提交记忆所做内容
var submit_do = function() {
  var hash = new Hash();
  var memories = $$('input[name="memory"]');
  for(var i = 0; i < memories.length; i++) {
    hash.set(memories[i].id, memories[i].value);
  }
  new Ajax.Request('/memcreate', {
    method: 'post',
    onSuccess: function(transport) {
      var data = transport.responseJSON;
      autorun(data, 0, false);
    },
    parameters: {authenticity_token: rails_token, memory: hash.toJSON()}
  });
}

// 添加记忆的form
var create_form = function(e) {
  var form = rails_form(rails_token, "#");

  var input = new Element('input', {type: 'hidden', name: 'memory', id: 'lng', value: e.point.lng});
  form.appendChild(input);

  var input = new Element('input', {type: 'hidden', name: 'memory', id: 'lat', value: e.point.lat});
  form.appendChild(input);

  form.innerHTML += "时间:";
  var input = new Element('input', {type: 'text', name: 'memory', id: 'mdate'});
  form.appendChild(input);

  form.innerHTML += "<br />地址:";
  var input = new Element('input', {type: 'text', name: 'memory', id: 'address'});
  form.appendChild(input);

  form.innerHTML += "<br />描述:";
  var input = new Element('input', {type: 'text', name: 'memory', id: 'content'});
  form.appendChild(input);

  form.innerHTML += "<input type='button' value='记忆' onclick='submit_do()' />";

  var container = new Element('div', {});
  container.appendChild(form);

  return container.innerHTML;
}

var info_window = function(data) {
  var div = new Element('div');

  div.innerHTML += "时间:" + data.mdate + "<br />";
  div.innerHTML += "地址:" + data.address + "<br />";
  div.innerHTML += "描述:" + data.content + "<br />";
  div.innerHTML += "<a href='javascript:void(0)' onclick='play_memories(2000, true)'>播放记忆</a>";

  return div.innerHTML;
}

var play_memories = function(time, line) {
  new Ajax.Request('/memories_to_json', {
    method: 'get',
    onSuccess: function(transport) {
      init_data = transport.responseJSON;
      map.clearOverlays(); // 清除所有覆盖物
      for(var i = 0; i < init_data.length; i++) { autorun(init_data[i], (time > 0 ? time * i : 0), line, i); }
    },
    parameters: {authenticity_token: rails_token}
  });
}

var autorun = function(data, time, line, index) {
  window.setTimeout(function(){
    var cdata = data; //init_data[index];
    var point = new BMap.Point(cdata.lng, cdata.lat);
    // 标注
    var marker = new BMap.Marker(point);        // 创建标注
    marker.addEventListener("mouseover", function() { close_memories() });
    marker.addEventListener("mouseout", function() { add_memories_event() });
    marker.addEventListener("click", function() { create_showindow(cdata, point) });
    map.addOverlay(marker);                     // 将标注添加到地图中
    if (line) { map.panTo(new BMap.Point(cdata.lng, cdata.lat), true); }
    create_showindow(cdata, point);
    if (index > 0 && line) {
      ldata = init_data[index - 1];
      var polyline = new BMap.Polyline(
        [point, new BMap.Point(ldata.lng, ldata.lat)],  
        {strokeColor:"blue", strokeWeight:4, strokeOpacity:0.5}  
      );
      map.addOverlay(polyline);  
    }
  }, time); 
}

var add_memories_event = function() {
  var obj = $('mem_btn');
  if (obj) {
    if (obj.innerHTML == '开启记忆') {
      map.addEventListener("click", create_infowindow );
      obj.innerHTML = '关闭记忆';
    } else if (obj.innerHTML == '关闭记忆') {
      map.removeEventListener("click", create_infowindow );
      obj.innerHTML = '开启记忆';
    }
  }
}

var close_memories = function() {
  var obj = $('mem_btn');
  if (obj) {
    map.removeEventListener("click", create_infowindow );
    obj.innerHTML = '开启记忆';
  }
}

var create_infowindow = function(e) {
  var infoWindow = new BMap.InfoWindow(create_form(e), opts);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, e.point);      // 打开信息窗口
}

var create_showindow = function(cdata, point) {
  var infoWindow = new BMap.InfoWindow(info_window(cdata), opts);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point);
}

var remove_memories = function(id, lng, lat) {
  if (confirm('确认删除此记忆吗？')) {
    alert("删除成功");
  }
}

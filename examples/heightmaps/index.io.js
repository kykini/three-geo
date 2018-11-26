"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i.return&&_i.return()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),canvas=document.getElementById("canvas"),camera=new THREE.PerspectiveCamera(75,canvas.width/canvas.height,.001,1e3);camera.position.set(0,0,1.5),camera.up.set(0,0,1);var renderer=new THREE.WebGLRenderer({canvas:canvas}),controls=new THREE.OrbitControls(camera,renderer.domElement),resizeCanvasToDisplaySize=function(){var force=arguments.length>0&&void 0!==arguments[0]&&arguments[0],width=canvas.clientWidth,height=canvas.clientHeight;(force||canvas.width!=width||canvas.height!=height)&&(renderer.setSize(width,height,!1),camera.aspect=width/height,camera.updateProjectionMatrix())};resizeCanvasToDisplaySize(!0);var scene=new THREE.Scene,walls=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(1,1,1)),new THREE.LineBasicMaterial({color:13421772}));walls.position.set(0,0,0),scene.add(walls),scene.add(new THREE.AxesHelper(1));var stats=new Stats;stats.showPanel(1),document.body.appendChild(stats.dom);var render=function(){stats.update(),resizeCanvasToDisplaySize(),renderer.render(scene,camera)};render(),controls.addEventListener("change",render);var tgeo=new ThreeGeo({tokenMapbox:"pk.eyJ1IjoiamRldmVsIiwiYSI6ImNqaTV1Nm9nNjA5MjkzcW1od2Y2Y3o0dHgifQ.tf4lJU5fzGJVJ4TyLbnfXA"}),isDebug=0;isDebug&&(tgeo.tokenMapbox="zzzz",tgeo.setApiRgb("../geo-viewer/cache/eiger/mapbox-terrain-rgb"),tgeo.setApiSatellite("../geo-viewer/cache/eiger/mapbox-satellite"));var createTextCanvas=function(str,width,height){var opts=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},defaults={bg:"#fff",tbg:"#fff",tfg:"#000",fontFamily:"Times"},actual=Object.assign({},defaults,opts),can=document.createElement("canvas");can.width=width,can.height=height;var ctx=can.getContext("2d");ctx.textAlign="left",ctx.textBaseline="middle",str=str.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/,'"');var w=ctx.measureText(str).width+16;return ctx.font="36px "+actual.fontFamily,ctx.fillStyle=actual.bg,ctx.fillRect(0,0,can.width,can.height),ctx.fillStyle=actual.tbg,ctx.fillRect(0,0,w,45),ctx.fillStyle=actual.tfg,ctx.fillText(str,25,35),can},createPanelSprite=function(can){var pixelsPerUnit=arguments.length>1&&void 0!==arguments[1]?arguments[1]:512,mat=new THREE.SpriteMaterial({map:new THREE.Texture(can),opacity:.7,color:16777215});mat.map.needsUpdate=!0;var sp=new THREE.Sprite(mat);return sp.scale.set(can.width/pixelsPerUnit,can.height/pixelsPerUnit,1),sp},demToObjects=function(demUri,demTile,proj){var _plane$position,_ThreeGeo$bboxToWiref=ThreeGeo.bboxToWireframe(ThreeGeo.tileToBbox(demTile),proj,{offsetZ:-.1,color:13369548}),obj=_ThreeGeo$bboxToWiref.obj,offset=_ThreeGeo$bboxToWiref.offset,size=_ThreeGeo$bboxToWiref.size,_demUri=demUri;if(isDebug){var _demTile=_slicedToArray(demTile,3),tx=_demTile[0],ty=_demTile[1];_demUri="../geo-viewer/cache/eiger/mapbox-terrain-rgb-"+_demTile[2]+"-"+tx+"-"+ty+".blob"}var plane=new THREE.Mesh(new THREE.PlaneGeometry(size[0],size[1]),new THREE.MeshBasicMaterial({map:(new THREE.TextureLoader).load(_demUri)}));(_plane$position=plane.position).set.apply(_plane$position,_toConsumableArray(offset));var sprite=createPanelSprite(createTextCanvas(""+demTile.join("-"),256,64,{tfg:"#f0f"}));return sprite.position.set(offset[0],offset[1],offset[2]+.1),{wireframe:obj,plane:plane,sprite:sprite}},$msg=$("#msg");if(tgeo.tokenMapbox.startsWith("****")){var warning="Please set your Mapbox API token in ThreeGeo constructor.";$msg.append("<div>"+warning+"</div>")}else{var origin=[46.5763,7.9904],radius=5,_tgeo$getProjection=tgeo.getProjection(origin,radius),proj=_tgeo$getProjection.proj,bbox=_tgeo$getProjection.bbox,unitsPerMeter=_tgeo$getProjection.unitsPerMeter,srcDemUris={};$msg.empty(),$msg.append("<div>---- ROI ----</div>"),$msg.append("<div>lat lng: ("+origin[0]+", "+origin[1]+")</div>"),$msg.append("<div>radius: "+radius+" [km]</div>"),$msg.append("<div>units per km: "+1e3*unitsPerMeter+"</div>"),$msg.append("<div>bbox (w, s, e, n): ("+bbox.map(function(q){return q.toFixed(4)}).join(", ")+")</div>"),$msg.append("<div>---- Terrain Composition ----</div>"),tgeo.getTerrain(origin,radius,12,{onRgbDem:function(meshes){meshes.forEach(function(mesh){scene.add(mesh);mesh.geometry.attributes.position.array;var tile=mesh.userData.threeGeo.tile,_ThreeGeo$bboxToWiref2=ThreeGeo.bboxToWireframe(ThreeGeo.tileToBbox(tile),proj,{offsetZ:-.05}),obj=_ThreeGeo$bboxToWiref2.obj,offset=_ThreeGeo$bboxToWiref2.offset,sp=createPanelSprite(createTextCanvas(""+tile.join("-"),256,64,{tfg:"#0ff"}));sp.position.set(offset[0],offset[1],offset[2]+.05),scene.add(obj,sp);var srcDem=mesh.userData.threeGeo.srcDem,srcDemUri=""+srcDem.uri+tgeo.tokenMapbox,srcDemTile=srcDem.tile;if(!srcDemUris[srcDemUri]){srcDemUris[srcDemUri]=!0;var _demToObjects=demToObjects(srcDemUri,srcDemTile,proj),wireframe=_demToObjects.wireframe,plane=_demToObjects.plane,sprite=_demToObjects.sprite;scene.add(wireframe,plane,sprite)}$msg.append('<div><span style="color: #00ffffff;">tile '+tile.join("-")+'</span> using <span style="color: #ff00ffff";>DEM '+srcDemTile.join("-")+"</span></div>")}),render()},onSatelliteMat:function(mesh){mesh.material.wireframe=!0,render()}})}

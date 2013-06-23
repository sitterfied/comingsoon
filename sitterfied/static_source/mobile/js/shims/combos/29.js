webshims.register("track",function(e,t,a,r){"use strict";var n=t.mediaelement;(new Date).getTime();var i=e.fn.addBack?"addBack":"andSelf",o={subtitles:1,captions:1,descriptions:1},s=e("<track />"),l=Modernizr.ES5&&Modernizr.objectAccessor,u=function(e){var a={};return e.addEventListener=function(e,r){a[e]&&t.error("always use $.on to the shimed event: "+e+" already bound fn was: "+a[e]+" your fn was: "+r),a[e]=r},e.removeEventListener=function(e,r){a[e]&&a[e]!=r&&t.error("always use $.on/$.off to the shimed event: "+e+" already bound fn was: "+a[e]+" your fn was: "+r),a[e]&&delete a[e]},e},c={getCueById:function(e){for(var t=null,a=0,r=this.length;r>a;a++)if(this[a].id===e){t=this[a];break}return t}},d={0:"disabled",1:"hidden",2:"showing"},p={shimActiveCues:null,_shimActiveCues:null,activeCues:null,cues:null,kind:"subtitles",label:"",language:"",mode:"disabled",readyState:0,oncuechange:null,toString:function(){return"[object TextTrack]"},addCue:function(e){if(this.cues){var a=this.cues[this.cues.length-1];a&&a.startTime>e.startTime&&t.error("cue startTime higher than previous cue's startTime")}else this.cues=n.createCueList();e.track&&e.track.removeCue&&e.track.removeCue(e),e.track=this,this.cues.push(e)},removeCue:function(e){var a=this.cues||[],r=0,n=a.length;if(e.track!=this)return t.error("cue not part of track"),undefined;for(;n>r;r++)if(a[r]===e){a.splice(r,1),e.track=null;break}return e.track?(t.error("cue not part of track"),undefined):undefined},DISABLED:"disabled",OFF:"disabled",HIDDEN:"hidden",SHOWING:"showing",ERROR:3,LOADED:2,LOADING:1,NONE:0},f=["kind","label","srclang"],h={srclang:"language"},m=Function.prototype.call.bind(Object.prototype.hasOwnProperty),v=function(a,r){var n,i,o=[],s=[],l=[];if(a||(a=t.data(this,"mediaelementBase")||t.data(this,"mediaelementBase",{})),r||(a.blockTrackListUpdate=!0,r=e.prop(this,"textTracks"),a.blockTrackListUpdate=!1),clearTimeout(a.updateTrackListTimer),e("track",this).each(function(){var t=e.prop(this,"track");l.push(t),-1==r.indexOf(t)&&s.push(t)}),a.scriptedTextTracks)for(n=0,i=a.scriptedTextTracks.length;i>n;n++)l.push(a.scriptedTextTracks[n]),-1==r.indexOf(a.scriptedTextTracks[n])&&s.push(a.scriptedTextTracks[n]);for(n=0,i=r.length;i>n;n++)-1==l.indexOf(r[n])&&o.push(r[n]);if(o.length||s.length){for(r.splice(0),n=0,i=l.length;i>n;n++)r.push(l[n]);for(n=0,i=o.length;i>n;n++)e([r]).triggerHandler(e.Event({type:"removetrack",track:o[n]}));for(n=0,i=s.length;i>n;n++)e([r]).triggerHandler(e.Event({type:"addtrack",track:s[n]}));(a.scriptedTextTracks||o.length)&&e(this).triggerHandler("updatetrackdisplay")}},g=function(a,r){r||(r=t.data(a,"trackData")),r&&!r.isTriggering&&(r.isTriggering=!0,setTimeout(function(){(r.track||{}).readyState?e(a).closest("audio, video").triggerHandler("updatetrackdisplay"):e(a).triggerHandler("checktrackmode"),r.isTriggering=!1},1))},y=e("<div />")[0];a.TextTrackCue=function(e,a,r){3!=arguments.length&&t.error("wrong arguments.length for TextTrackCue.constructor"),this.startTime=e,this.endTime=a,this.text=r,this.id="",this.pauseOnExit=!1,u(this)},a.TextTrackCue.prototype={onenter:null,onexit:null,pauseOnExit:!1,getCueAsHTML:function(){var e,t="",a="",i=r.createDocumentFragment();return m(this,"getCueAsHTML")||(e=this.getCueAsHTML=function(){var e,r;if(t!=this.text)for(t=this.text,a=n.parseCueTextToHTML(t),y.innerHTML=a,e=0,r=y.childNodes.length;r>e;e++)i.appendChild(y.childNodes[e].cloneNode(!0));return i.cloneNode(!0)}),e?e.apply(this,arguments):i.cloneNode(!0)},track:null,id:""},n.createCueList=function(){return e.extend([],c)},n.parseCueTextToHTML=function(){var e=/(<\/?[^>]+>)/gi,t=/^(?:c|v|ruby|rt|b|i|u)/,a=/\<\s*\//,r=function(e,t,r,n){var i;return a.test(n)?i="</"+e+">":(r.splice(0,1),i="<"+e+" "+t+'="'+r.join(" ").replace(/\"/g,"&#34;")+'">'),i},n=function(e){var a=e.replace(/[<\/>]+/gi,"").split(/[\s\.]+/);return a[0]&&(a[0]=a[0].toLowerCase(),t.test(a[0])?"c"==a[0]?e=r("span","class",a,e):"v"==a[0]&&(e=r("q","title",a,e)):e=""),e};return function(t){return t.replace(e,n)}}(),n.loadTextTrack=function(a,r,i,s){var l="play playing timeupdate updatetrackdisplay",u=i.track,c=function(){var i,o,s=e.prop(r,"src");if("disabled"!=u.mode&&s&&e.attr(r,"src")&&(e(a).unbind(l,c),e(r).unbind("checktrackmode",c),!u.readyState)){i=function(){u.readyState=3,u.cues=null,u.activeCues=u.shimActiveCues=u._shimActiveCues=null,e(r).triggerHandler("error")},u.readyState=1;try{u.cues=n.createCueList(),u.activeCues=u.shimActiveCues=u._shimActiveCues=n.createCueList(),o=e.ajax({dataType:"text",url:s,success:function(s){"text/vtt"!=o.getResponseHeader("content-type")&&t.error("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt"),n.parseCaptions(s,u,function(t){t&&"length"in t?(u.readyState=2,e(r).triggerHandler("load"),e(a).triggerHandler("updatetrackdisplay")):i()})},error:i})}catch(d){i(),t.warn(d)}}};u.readyState=0,u.shimActiveCues=null,u._shimActiveCues=null,u.activeCues=null,u.cues=null,e(a).unbind(l,c),e(r).unbind("checktrackmode",c),e(a).on(l,c),e(r).on("checktrackmode",c),s&&(u.mode=o[u.kind]?"showing":"hidden",c())},n.createTextTrack=function(a,r){var o,s;return r.nodeName&&(s=t.data(r,"trackData"),s&&(g(r,s),o=s.track)),o||(o=u(t.objectCreate(p)),l||f.forEach(function(t){var a=e.prop(r,t);a&&(o[h[t]||t]=a)}),r.nodeName?(l&&f.forEach(function(a){t.defineProperty(o,h[a]||a,{get:function(){return e.prop(r,a)}})}),s=t.data(r,"trackData",{track:o}),n.loadTextTrack(a,r,s,e.prop(r,"default")&&e(r).siblings("track[default]")[i]()[0]==r)):(l&&f.forEach(function(e){t.defineProperty(o,h[e]||e,{value:r[e],writeable:!1})}),o.cues=n.createCueList(),o.activeCues=o._shimActiveCues=o.shimActiveCues=n.createCueList(),o.mode="hidden",o.readyState=2)),o},n.parseCaptionChunk=function(){var e=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,a=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,r=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,n=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;return function(i){var o,s,l,u,c,d,p,f,h,m;if(f=a.exec(i))return null;if(f=r.exec(i))return null;if(f=n.exec(i))return null;for(o=i.split(/\n/g);!o[0].replace(/\s+/gi,"").length&&o.length>0;)o.shift();for(o[0].match(/^\s*[a-z0-9-\_]+\s*$/gi)&&(p=o.shift().replace(/\s*/gi,"")+""),d=0;o.length>d;d++){var v=o[d];(h=e.exec(v))&&(c=h.slice(1),s=parseInt(60*60*(c[0]||0),10)+parseInt(60*(c[1]||0),10)+parseInt(c[2]||0,10)+parseFloat("0."+(c[3]||0)),l=parseInt(60*60*(c[4]||0),10)+parseInt(60*(c[5]||0),10)+parseInt(c[6]||0,10)+parseFloat("0."+(c[7]||0))),o=o.slice(0,d).concat(o.slice(d+1));break}return s||l?(u=o.join("\n"),m=new TextTrackCue(s,l,u),p&&(m.id=p),m):(t.warn("couldn't extract time information: "+[s,l,o.join("\n"),p].join(" ; ")),null)}}(),n.parseCaptions=function(e,a,r){n.createCueList();var i,o,s,l,u;e?(s=/^WEBVTT(\s*FILE)?/gi,o=function(c,d){for(;d>c;c++){if(i=e[c],s.test(i))u=!0;else if(i.replace(/\s*/gi,"").length){if(!u){t.error("please use WebVTT format. This is the standard"),r(null);break}i=n.parseCaptionChunk(i,c),i&&a.addCue(i)}if((new Date).getTime()-30>l){c++,setTimeout(function(){l=(new Date).getTime(),o(c,d)},90);break}}c>=d&&(u||t.error("please use WebVTT format. This is the standard"),r(a.cues))},e=e.replace(/\r\n/g,"\n"),setTimeout(function(){e=e.replace(/\r/g,"\n"),setTimeout(function(){l=(new Date).getTime(),e=e.split(/\n\n+/g),o(0,e.length)},9)},9)):t.error("Required parameter captionData not supplied.")},n.createTrackList=function(e,a){return a=a||t.data(e,"mediaelementBase")||t.data(e,"mediaelementBase",{}),a.textTracks||(a.textTracks=[],t.defineProperties(a.textTracks,{onaddtrack:{value:null},onremovetrack:{value:null}}),u(a.textTracks)),a.textTracks},Modernizr.track||(t.defineNodeNamesBooleanProperty(["track"],"default"),t.reflectProperties(["track"],["srclang","label"]),t.defineNodeNameProperties("track",{src:{reflect:!0,propType:"src"}})),t.defineNodeNameProperties("track",{kind:{attr:Modernizr.track?{set:function(e){var a=t.data(this,"trackData");this.setAttribute("data-kind",e),a&&(a.attrKind=e)},get:function(){var e=t.data(this,"trackData");return e&&"attrKind"in e?e.attrKind:this.getAttribute("kind")}}:{},reflect:!0,propType:"enumarated",defaultValue:"subtitles",limitedTo:["subtitles","captions","descriptions","chapters","metadata"]}}),e.each(f,function(a,r){var n=h[r]||r;t.onNodeNamesPropertyModify("track",r,function(){var a=t.data(this,"trackData"),i=this;a&&("kind"==r&&g(this,a),l||(a.track[n]=e.prop(this,r)),clearTimeout(a.changedTrackPropTimer),a.changedTrackPropTimer=setTimeout(function(){e(i).trigger("updatesubtitlestate")},1))})}),t.onNodeNamesPropertyModify("track","src",function(a){if(a){var r,i=t.data(this,"trackData");i&&(r=e(this).closest("video, audio"),r[0]&&n.loadTextTrack(r,this,i))}}),t.defineNodeNamesProperties(["track"],{ERROR:{value:3},LOADED:{value:2},LOADING:{value:1},NONE:{value:0},readyState:{get:function(){return(e.prop(this,"track")||{readyState:0}).readyState},writeable:!1},track:{get:function(){return n.createTextTrack(e(this).closest("audio, video")[0],this)},writeable:!1}},"prop"),t.defineNodeNamesProperties(["audio","video"],{textTracks:{get:function(){var e=this,a=t.data(e,"mediaelementBase")||t.data(e,"mediaelementBase",{}),r=n.createTrackList(e,a);return a.blockTrackListUpdate||v.call(e,a,r),r},writeable:!1},addTextTrack:{value:function(e,a,r){var i=n.createTextTrack(this,{kind:s.prop("kind",e||"").prop("kind"),label:a||"",srclang:r||""}),o=t.data(this,"mediaelementBase")||t.data(this,"mediaelementBase",{});return o.scriptedTextTracks||(o.scriptedTextTracks=[]),o.scriptedTextTracks.push(i),v.call(this),i}}},"prop"),e(r).on("emptied ended updatetracklist",function(a){if(e(a.target).is("audio, video")){var r=t.data(a.target,"mediaelementBase");r&&(clearTimeout(r.updateTrackListTimer),r.updateTrackListTimer=setTimeout(function(){v.call(a.target,r)},0))}});var b=function(e,t){return t.readyState||e.readyState},w=function(e){e.originalEvent&&e.stopImmediatePropagation()},T=function(){if(t.implement(this,"track")){var a,r,n=e.prop(this,"track"),i=this.track;i&&(a=e.prop(this,"kind"),r=b(this,i),(i.mode||r)&&(n.mode=d[i.mode]||i.mode),"descriptions"!=a&&(i.mode="string"==typeof i.mode?"disabled":0,this.kind="metadata",e(this).attr({kind:a}))),e(this).on("load error",w)}};t.addReady(function(a,r){var n=r.filter("video, audio, track").closest("audio, video");e("video, audio",a).add(n).each(function(){v.call(this)}).each(function(){if(Modernizr.track){var a=e.prop(this,"textTracks"),r=this.textTracks;a.length!=r.length&&t.error("textTracks couldn't be copied"),e("track",this).each(T)}}),n.each(function(){var e=this,a=t.data(e,"mediaelementBase");a&&(clearTimeout(a.updateTrackListTimer),a.updateTrackListTimer=setTimeout(function(){v.call(e,a)},9))})}),Modernizr.track&&e("video, audio").trigger("trackapichange")}),function(e){if(Modernizr.track&&Modernizr.texttrackapi&&document.addEventListener){var t=webshims.cfg.track,a=function(t){e(t.target).filter("track").each(n)},r=webshims.bugs.track,n=function(){return r||!t.override&&3==e.prop(this,"readyState")?(t.override=!0,webshims.reTest("track"),document.removeEventListener("error",a,!0),this&&e.nodeName(this,"track")?webshims.error("track support was overwritten. Please check your vtt including your vtt mime-type"):webshims.info("track support was overwritten. due to bad browser support"),!1):void 0},i=function(){document.addEventListener("error",a,!0),r?n():e("track").each(n)};t.override||i()}}(jQuery),webshims.register("track-ui",function(e,t){"use strict";function a(e,t){var a=!0,r=0,n=e.length;if(n!=t.length)a=!1;else for(;n>r;r++)if(e[r]!=t[r]){a=!1;break}return a}var r=t.cfg.track,n={subtitles:1,captions:1,descriptions:1},i=t.mediaelement,o=function(){return!r.override&&Modernizr.track},s={update:function(r,n){r.activeCues.length?a(r.displayedActiveCues,r.activeCues)||(r.displayedActiveCues=r.activeCues,r.trackDisplay||(r.trackDisplay=e('<div class="cue-display"><span class="description-cues" aria-live="assertive" /></div>').insertAfter(n),this.addEvents(r,n),t.docObserve()),r.hasDirtyTrackDisplay&&n.triggerHandler("forceupdatetrackdisplay"),this.showCues(r)):this.hide(r)},showCues:function(t){var a=e('<span class="cue-wrapper" />');e.each(t.displayedActiveCues,function(r,n){var i=n.id?'id="cue-id-'+n.id+'"':"",o=e('<span class="cue-line"><span '+i+' class="cue" /></span>').find("span").html(n.getCueAsHTML()).end();"descriptions"==n.track.kind?setTimeout(function(){e("span.description-cues",t.trackDisplay).html(o)},0):a.prepend(o)}),e("span.cue-wrapper",t.trackDisplay).remove(),t.trackDisplay.append(a)},addEvents:function(e,t){if(r.positionDisplay){var a,n=function(a){if(e.displayedActiveCues.length||a===!0){e.trackDisplay.css({display:"none"});var r=t.getShadowElement();r.offsetParent();var n=r.innerHeight(),i=r.innerWidth(),o=r.position();e.trackDisplay.css({left:o.left,width:i,height:n-45,top:o.top,display:"block"}),e.trackDisplay.css("fontSize",Math.max(Math.round(n/30),7)),e.hasDirtyTrackDisplay=!1}else e.hasDirtyTrackDisplay=!0},i=function(){clearTimeout(a),a=setTimeout(n,0)},o=function(){n(!0)};t.on("playerdimensionchange mediaelementapichange updatetrackdisplay updatemediaelementdimensions swfstageresize",i),t.on("forceupdatetrackdisplay",o).onWSOff("updateshadowdom",i),o()}},hide:function(t){t.trackDisplay&&t.displayedActiveCues.length&&(t.displayedActiveCues=[],e("span.cue-wrapper",t.trackDisplay).remove(),e("span.description-cues",t.trackDisplay).empty())}};if(e.extend(e.event.customEvent,{updatetrackdisplay:!0,forceupdatetrackdisplay:!0}),i.trackDisplay=s,!i.createCueList){var l={getCueById:function(e){for(var t=null,a=0,r=this.length;r>a;a++)if(this[a].id===e){t=this[a];break}return t}};i.createCueList=function(){return e.extend([],l)}}i.getActiveCue=function(t,a,o,s){t._lastFoundCue||(t._lastFoundCue={index:0,time:0}),!Modernizr.track||r.override||t._shimActiveCues||(t._shimActiveCues=i.createCueList());for(var l,u,c=0;t.shimActiveCues.length>c;c++)u=t.shimActiveCues[c],u.startTime>o||o>u.endTime?(t.shimActiveCues.splice(c,1),c--,u.pauseOnExit&&e(a).pause(),e(t).triggerHandler("cuechange"),e(u).triggerHandler("exit")):"showing"==t.mode&&n[t.kind]&&-1==e.inArray(u,s.activeCues)&&s.activeCues.push(u);for(l=t.cues.length,c=o>t._lastFoundCue.time?t._lastFoundCue.index:0;l>c&&(u=t.cues[c],o>=u.startTime&&u.endTime>=o&&-1==e.inArray(u,t.shimActiveCues)&&(t.shimActiveCues.push(u),"showing"==t.mode&&n[t.kind]&&s.activeCues.push(u),e(t).triggerHandler("cuechange"),e(u).triggerHandler("enter"),t._lastFoundCue.time=o,t._lastFoundCue.index=c),!(u.startTime>o));c++);},o()&&function(){var a,r=function(t){setTimeout(function(){a=!0,e(t).triggerHandler("updatetrackdisplay"),a=!1},9)},n=function(n,i,s){var l,u="_sup"+s,c={prop:{}};c.prop[s]=function(){return!a&&o()&&r(e(this).closest("audio, video")),l.prop[u].apply(this,arguments)},l=t.defineNodeNameProperty(n,i,c)};n("track","track","get"),["audio","video"].forEach(function(e){n(e,"textTracks","get"),n("nodeName","addTextTrack","value")})}(),t.addReady(function(a,r){e("video, audio",a).add(r.filter("video, audio")).filter(function(){return t.implement(this,"trackui")}).each(function(){var a,r,n,l=e(this),u=function(){var e,n;if(r&&a||(r=l.prop("textTracks"),a=t.data(l[0],"mediaelementBase")||t.data(l[0],"mediaelementBase",{}),a.displayedActiveCues||(a.displayedActiveCues=[])),r&&(n=l.prop("currentTime"),n||0===n)){a.activeCues=[];for(var o=0,u=r.length;u>o;o++)e=r[o],"disabled"!=e.mode&&e.cues&&e.cues.length&&i.getActiveCue(e,l,n,a);s.update(a,l)}},c=function(e){clearTimeout(n),e&&"timeupdate"==e.type?(u(),setTimeout(c,90)):n=setTimeout(u,9)},d=function(){l.off(".trackview").on("play.trackview timeupdate.trackview updatetrackdisplay.trackview",c)};l.on("remove",function(e){!e.originalEvent&&a&&a.trackDisplay&&a.trackDisplay.remove()}),o()?l.on("mediaelementapichange trackapichange",function(){!o()||l.is(".nonnative-api-active")?d():(r=l.prop("textTracks"),a=t.data(l[0],"mediaelementBase")||t.data(l[0],"mediaelementBase",{}),e.each(r,function(e,t){t._shimActiveCues&&delete t._shimActiveCues}),s.hide(a),l.unbind(".trackview"))}):d()})})});
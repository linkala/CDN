
var History =  {
   'Json':'',
   'Init':function(){
      let bin = $('#history');
      let list = this.Get('history');
      bin.click(()=>{
         if(bin.parent().hasClass("on")){
            bin.parent().removeClass('on');
          }else{
            bin.parent().addClass('on');
         }
      })

      $(document).on('click', 'body',function(event){
         var body = $('body');
         body.on('click', function(){
              if(bin.parent().hasClass("on")){
                bin.parent().removeClass('on');
              }
         });
      })
     let html =``;
    
      for (let key in list) {
         let vo = list[key];
         
         // html+=`<li><a href='${vo.link}' target="_blank">${vo.name}</a></li>`;
         html+=`<li>
         <a href="${vo.link}" class="history_link" target="_blank">
            <span class="history_name">${vo.name}</span>
            <span class="history_nid" style="float:right">${vo.nid}</span>
         </a>

      </li>`;
      }
      $('#history_list').append(html)
      this.Set();
   },
    'Set':function(){
      var $that = $(".history_Set");
        
      if (typeof($that.attr('data-id')) == 'undefined' ){
        return;
      }
      let obj = {"id":$that.attr('data-id'),"name":$that.attr('data-name'),"link":$that.attr('data-link'),"sid":$that.attr('data-sid'),"nid":$that.attr('data-nid')}
		let arr1 = {};
		try {
          const History = localStorage.getItem("history");
		    arr1 = History !==null ? JSON.parse(History) : {};  
		} catch (e) {
		    // error8
		};
		let arr2 = {};
		arr2[obj.id] = obj;
		let str = this.arrayFun(arr1,arr2);
		localStorage.setItem('history',JSON.stringify(str));
    },
    'Get':function(key){
       let json = {};
         try {
            const History = localStorage.getItem(key);
            json = History !==null ? JSON.parse(History) : {}; 
         } catch (e) {
            // error8
         };
         return json;
    },
    'Clear':function(key){
      if(confirm('确定要清空记录吗')){
          $('#history_list').html('')
            localStorage.removeItem('history');
      }
    },
    'arrayFun':function(arr1,arr2){
		//合并对象
		if(JSON.stringify(arr1) == "{}"){
			console.log('arr1为空')
			arr1 = arr2
		};
		for(let i in arr1){
			for(let j in arr2){
				if(i==j){
					arr1[i] = arr2[j]
				}else{
					arr1[j] = arr2[j]
				}
			}
		}
		return arr1
   }
}

$(function(){
   History.Init()
})
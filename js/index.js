

$(function(){
	
	//获取列表的数量
	var listLength = $(".content li").length;
	var nextPage = $("#nextPage");

	var content=$(".content");
	$.ajax({
			url:"data.json",
			type:"GET",
			dataType:"json",
			success:function(data){
				dealData(data)
			},
			error:function(){
				throw new Error("错误")
			}
	})
	function dealData(data){
		
		var pagesContainer=$(".pagesContainer");
		var page=1;
		// var flag=false;
		//加载列表
		
		openList(page,data)
		//加载列表 函数
		function openList(page,data){
			
			var contentUl=$("<ul></ul>");
			contentUl.attr("id","contentUl")
			for(var i=(page-1)*14;i<page*14;i++){
				
				if(data[i]){
					var li=$("<li></li>");
					var a=$("<a></a>");
					a.attr({"href":data[i].href})
					var span1=$("<span></span>");
					span1.html(data[i].id)
					var span2=$("<span></span>");
					span2.html(data[i].date)
					var div=$("<div></div>");
					div.attr("class","itemTitle")
					div.html(data[i].context);
					a.append(span1);
					a.append(div);
					a.append(span2);
					li.append(a);
					contentUl.append(li)
				
					
				}else{
					// flag=true;
					break ;
				}
			}
			content.prepend(contentUl);
		}
	




		//加载时禁用上一页按钮
		$("#prePage").attr("disabled","disabled");


		//创建分页按钮
		var pages=Math.ceil(data.length / 14);

		for(var i=1;i<pages+1;i++){
			//创建相关按钮
			var button=$("<button></button>")
			button.html(i);
			button.attr("id",i)
			
			pagesContainer.append(button)
		}
		//绑定分页按钮事件
		$(".pagesContainer").on("click","button",function(e){
			
			$(this).parent().siblings("button").removeAttr("class");
			$(e.target).attr("class","active").siblings().removeAttr("class");
			if($("#contentUl li").length){
				$("#contentUl").remove();
			};
			var tmpId=$(e.target).attr("id");
			if(tmpId != 1){
				
				$("#prePage").removeAttr("disabled");
			}else{
				$("#prePage").attr("disabled","disabled");
			}
			if(tmpId != pages){
				$("#nextPage").removeAttr("disabled");
			}else{
				$("#nextPage").attr("disabled","disabled");
			}
			openList(tmpId,data)
		})


		//下一页按钮事件
		$("#nextPage").click(function(){
			if($("#contentUl li").length){
				$("#contentUl").remove();
			};
			$(this).siblings("button").removeAttr("class");
			$(".pagesContainer button.active").removeAttr("class").next().attr("class","active")
			//获取选中的页数
			var pageId=$(".pagesContainer button.active").attr("id")

			// page++
			openList(pageId,data)
			$("#prePage").removeAttr("disabled");
			if(pageId==pages){
				$(this).attr("disabled","disabled");
				$(this).removeAttr("class")
			}else{
				$(this).attr("class","active")
			}
		});
		//上一页按钮事件
		$("#prePage").click(function(){
			if($("#contentUl li").length){
				$("#contentUl").remove();
			}

			//选中
			$(this).attr("class","active");
			$(this).siblings("button").removeAttr("class");
			$(".pagesContainer button.active").removeAttr("class").prev().attr("class","active");
			
			//获取选中的页数
			var pageId=$(".pagesContainer button.active").attr("id")
			// page--
			openList(pageId,data);
			$("#nextPage").removeAttr("disabled");
			if(pageId==1){
				$(this).attr("disabled","disabled");
				$(this).removeAttr("class")
			}
		})
		//主页按钮事件
		$("#mainPage").click(function(){
			if($("#contentUl li").length){
				$("#contentUl").remove();
			}
			//选中
			$(this).attr("class","active");
			$(this).siblings("button").removeAttr("class");
			$(".pagesContainer button.active").removeAttr("class");
			$(".pagesContainer button:first").attr("class","active")
			openList(1,data);
		})

	}
})
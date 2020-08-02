const $among = $(".among");
const $siteList = $(".siteList");
const $lastLi = $siteList.find("div.last-site");

//尝试读取当前的x
const x = localStorage.getItem("x");
//如果不是对象就把它转换为对象
const xObject = JSON.parse(x);
//用hashMap让网页保存
//parcel 会默认在我们的全局变量外加个作用域
const hashMap = xObject || [
  { logo: "百度", logoType: "text", url: "https://www.baidu.com" },
  {
    logo: "MDN",
    logoType: "text",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { logo: "哔哩哔哩", logoType: "text", url: "https://www.bilibili.com/" },
];

//简化url
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容，.*的意思是杠后面的任何东西
};
//遍历hashMap
const render = () => {
  $siteList.find("li").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
      <div class="s-left"></div>
      <div class="s-center">${node.logo}</div>
      <div class="s-right">${simplifyUrl(node.url)}</div>
      <div class="close"></div>
</div>

</li>`).appendTo($siteList);
    //删除按钮，阻止冒泡
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1); //index里删除1个
      render(); //再渲染一下
    });
    $li.on("click", () => {
      location.href = node.url;
    });
  });
};
render();
$(".formSelect").change(function () {
  let selectVal = $(".formSelect option:selected").val();
  const $searchForm = $(".searchForm");
  const $action = $(".searchForm").attr("action");
  //   console.log($searchForm);
  //   console.log($action);

  if (selectVal === "op-3") {
    $(".searchForm").attr("action", "https://search.bilibili.com/all");
  } else if (selectVal === "op-2") {
    $(".searchForm").attr(
      "action",
      "https://developer.mozilla.org/zh-CN/search"
    );
  } else if (selectVal === "op-4") {
    $(".searchForm").attr("action", "https://www.zhihu.com/search");
  } else if (selectVal === "op-1") {
    $(".searchForm").attr("action", "https://www.baidu.com/s");
  }

  console.log($action);
});

//新增网址div
$(".last-p").on("click", () => {
  // $(".dialogBox").css("display", "block");
  // let url = $(".dialogBox").find($("input[name=address]"));
  // console.log(url);
  let url = window.prompt("请输入新增网址地址");
  if (url.indexOf[0] !== 0) {
    url = "https://" + url;
  }
  let logo = window.prompt("请输入该网址名字");
  console.log(url);
  $siteList.find("li").remove();
  hashMap.push({ logo: logo, logoType: "text", url: url });
  render();
});

// 用户页面关闭的时候执行;
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  //在本地存储里设置一个x，x就是string
  localStorage.setItem("x", string);
};

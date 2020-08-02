const $siteList = $(".siteList");
const $lastList = $siteList.find("div.last-site");
//创建初始
const x = localStorage.getItem("x"); //获得保存内容
const xObject = jSON.parcel(x); //再转换为对象

const hashMap = xObject || [
  { logo: "百度", logoType: "text", url: "https://www.baidu.com" },
  { logo: "bilibili", logoType: "text", url: "https://bilibili.com" },
  { logo: "bilibili", logoType: "text", url: "https://bilibili.com" },
];

//新建网址来源
$(".last-p").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf[0] !== 0) {
    url = "https://" + url;
  }
  let logo = window.prompt("请输入网址名字");
  $siteList.find("li").remove();
  hashMap.push({ logo: logo, logoType: "text", url: url }), render();
});
render(); //增加后要渲染一下

//优化url

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

//新增网址操作
//遍历hashMap
const render = () => {
  $siteList.find("li").remove(); //把之前清空
  //就是看看hashMap里有什么内容
  //node:哈希表内容
  hashMap.forEach((node, index) => {
    const $li = $(`
    <div class="site">
    <div class="s-left"></div>
    <div class="s-center">${node.logo}</div>
    <div class="s-right">${simplifyUrl(node.url)}</div>
    <div class="close"></div>
</div>
</li>`).appendTo($siteList);
    //删除盒子，防止冒泡
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    $li.on("click", () => {
      location.href = node.url;
    });
  });
};
render(); //渲染一下

//开始保留盒子__________________
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //变成字符串
  localStorage.setItem("x", string);
};

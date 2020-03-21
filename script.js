// 获取节点
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// 创建searchSongs函数，获得歌曲数据
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);

  showData(data);
}

// 显示歌曲信息到DOM
function showData(data) {
  //   let output = "";
  //   data.data.forEach(song => {
  //     output += `
  //         <li>
  //         <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //         <button class="btn" data-artist ="${song.artist.name}" data-songtitle ="${song.title}">歌词</button>
  //         </li>
  //         `;
  //   });

  //   result.innerHTML = `
  //     <ul class="songs">
  //     ${output}
  //     </ul>
  //     `;

  result.innerHTML = `
    <ul class ="songs">
    ${data.data
      .map(
        song => `
    <li>
<span><strong>${song.artist.name}</strong> - ${song.title}</span>
<button class="btn" data-artist ="${song.artist.name}" data-songtitle ="${song.title}">歌词</button>
</li>
    `
      )
      .join("")}
    </ul>
    `;

  if (data.prev || data.next) {
    more.innerHTML = `${
      data.prev
        ? `<button class="btn" onclick = "getMoreSongs('${data.prev}')">上一页</button>`
        : ""
    }
          ${
            data.next
              ? `<button class="btn" onclick = "getMoreSongs('${data.next}')">下一页</button>`
              : ""
          }
          `;
  } else {
    more.innerHTML = "";
  }
}

// 获取上一页&下一页歌曲信息
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// 事件监听
form.addEventListener("submit", e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("请输入查询内容");
  } else {
    searchSongs(searchTerm);
  }
});

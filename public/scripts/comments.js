window.onload = function () {
  const commentsSectionElement = document.getElementById("comments");
  const commentsFormElement = document.getElementById("comment-form");
  const commentUserNameElement = document.getElementById("comment-username");
  const commentDescElement = document.getElementById("comment-desc");

  function createCommentsList(comments) {
    const commentList = document.createElement("ol");

    for (const comment of comments) {
      const commentElement = document.createElement("li");
      commentElement.innerHTML = `
      <h3> ${comment.username} </h3> 
      <p> ${comment.desc} </p>
      `;
      commentList.appendChild(commentElement);
    }
    return commentList;
  }

  async function fetchCommentsForPost() {
    const postId = commentsSectionElement.dataset.postid;

    try {
      const res = await fetch(`/posts/${postId}/comments`);
      const data = await res.json();

      if (!res.ok) {
        alert("Fetching Comments Failed");
        return;
      }

      const commentsListElement = createCommentsList(data.comments);
      commentsSectionElement.innerHTML = "";
      commentsSectionElement.appendChild(commentsListElement);
    } catch (err) {}
  }

  async function postComment(event) {
    event.preventDefault();

    const username = commentUserNameElement.value;
    const desc = commentDescElement.value;

    const comment = {
      username: username,
      desc: desc,
    };

    const postId = commentsFormElement.dataset.postid;
    try {
      const res = await fetch(`/posts/${postId}/post-comment`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        fetchCommentsForPost();
      } else {
        alert("Error Could not Save Comment.");
      }
    } catch (err) {
      alert("Could not Send Request. Internet Error.");
    }
  }

  fetchCommentsForPost();
  commentsFormElement.addEventListener("submit", postComment);
};

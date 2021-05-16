class BlogLoader {
  static loadBlogUrl = 'http://localhost:8000/Documents/Ruby/Javascript/jqery/jqfundamentals/exercises/data/blog.html ';

  constructor(blogLoaderObject) {
    this.blogLoaderObject = blogLoaderObject;
  }

  init() {
    this.createTargetDivForBlogs();
    this.bindEvents();
  }

  createTargetDivForBlogs() {
    this.blogs = $(this.blogLoaderObject.blogHeaderSelector);
    this.blogs.each(function(i, header) {
      const headerElement = $(header);
      const div = $('<div ></div>')
      div.insertAfter(headerElement);
      headerElement.data({
        'target': div,
        'postId': '#post' + (i + 1)
      });
    });
  }

  bindEvents() {
    this.blogs.each(function() {
      $(this).click(function(event) {
        event.preventDefault();
        const headerData = $(this).data();
        headerData.target.load(BlogLoader.loadBlogUrl + headerData.postId);
      });
    });
  }
}

$(document).ready(() => {
  const blogLoaderObject = {
    blogHeaderSelector: "#blog ul li h3"
  }
  const blogLoader = new BlogLoader(blogLoaderObject);
  blogLoader.init();
});

import { Link, useNavigate, useParams } from "react-router-dom";
import darkLogo from "../imgs/logo-light.png";
import lightLogo from "../imgs/logo-dark.png";
import AnimationWrapper from "../common/page-animation";
import defaultBannerLight from "../imgs/blog banner light.png";
import defaultBannerDark from "../imgs/blog banner dark.png";
import { uploadImage } from "../common/aws";
import { useContext, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { ThemeContext, UserContext } from "../App";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  let { theme } = useContext(ThemeContext);

  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);


  let { userAuth: {access_token}} = useContext(UserContext);

  let {blog_id} = useParams();

  let navigate = useNavigate();
  //useEffect
  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holder: "textEditor",
          data: Array.isArray(content) ? content[0] : content,
          tools: tools,
          placeholder: "Let's Write Some",
        })
      );
    }
  }, []);

  const handleBannerUpload = (e) => {
    let img = e.target.files[0];

    if (img) {
      let loadingToast = toast.loading("Uploading Image");

      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Image Uploaded Successfully");

            setBlog({ ...blog, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    console.log(e);
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handleError = (e) => {
    let img = e.target;

    img.src = theme == "light" ? defaultBannerLight : defaultBannerDark;
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error("Upload Some blog Banner to Publish");
    }
    if (!title.length) {
      return toast.error("Write Some blog Title to Publish");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            return toast.error("Write Something in your Blog");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      return toast.error("Write Some blog title to save draft");
    }

    let loadingToast = toast.loading("Saving Some Draft....");

    e.target.classList.add("disable");

    if(textEditor.isReady){
      textEditor.save().then(content => {


        let blogObj = {
          title,
          banner,
          des,
          content,
          tags,
          draft: true,
        };
        
        axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id}, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(() => {
          e.target.classList.remove("disable");
  
          toast.dismiss(loadingToast);
          toast.success("Drafted Some 😃");
  
          setTimeout(() => {
            navigate("/dashboard/blogs?tab=draft");
          }, 500);
        })
        .catch(({ response }) => {
          e.target.classList.remove("disable");
          toast.dismiss(loadingToast);
          return toast.error(response.data.error);
        });
      })
    }

   

   
  };

  return (
    <>
      <nav className="navbar z-50 bg-white">
        <Link className="flex-none w-14" to="/">
          <img src={ theme == "light" ? darkLogo : lightLogo } />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full text-2xl font-bold drop-shadow-xl">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  ref={blogBannerRef}
                  src={banner}
                  className="z-20"
                  onError={handleError}
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, jpeg"
                  hidden
                  onChange={handleBannerUpload}
                ></input>
              </label>
            </div>

            <textarea
              defaultValue={title}
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 rounded-xl bg-white"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              placeholder="Some Blog Title"
            ></textarea>

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;

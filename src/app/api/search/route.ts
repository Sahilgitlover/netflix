import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import MovieModel from "@/models/Movies";
import { log } from "console";

export const GET = async (request: NextRequest) => {
  const prefix = request.nextUrl.searchParams.get("title");
  console.log(prefix);
  if (!prefix) {
    return new Response(
      JSON.stringify({ success: false, message: "Prefix is required" }),
      { status: 400 }
    );
  }
  try {
    dbConnect()
    //$regex: ^${prefix}``: This regular expression matches any string that starts with the specified prefix. The ^ symbol signifies the start of the string.
    // $options: "i": This makes the regular expression case-insensitive.

    const movies = await MovieModel.find({
      title: { $regex: `^${prefix}`, $options: "i" },
    });
    console.log(movies);
    // let data:string[] = [] ;
    // for(let i = 0; i < movies.length; i++) {
    //     let t = movies[i].title;
    //     data.push(t);
    // }
    // console.log(data);
    
    if (!movies.length) {
      return new Response(
        JSON.stringify({ success: false, message: "No movies found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ success: true, movies }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error finding movies by title prefix:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error finding movies" }),
      { status: 500 }
    );
  }
};

/*    <div>
      <div>
        <div key={m._id as string} className=" relative h-48">
          <img
            src={m.imgSm}
            alt={m.title}
            width={50}
            height={50}
            className=" rounded-sm absolute w-full h-full object-cover"
          />
          <div className=" h-60 relative z-10 w-full transform duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <video src={m.trailer} autoPlay={true}  loop />
            <div className="itemInfo">
              <div className="icons"></div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>1999</span>
              </div>
              <div className="desc">{m.desc}</div>
              <div className="genre">{m.genre}</div>
            </div>
          </div>
        </div>
      </div>
    </div> */
// import { cookies } from "next/headers";

// export async function DELETE () {
//     try {
//         cookies().delete("id")
//         const cookieStore = cookies()
//         const hasCookie = cookieStore.has('id')
//         if(hasCookie) {
//             return new Response(JSON.stringify({ success: false, message: ' Error in deleting cookie' }), { status: 404 })
//         }
//         return new Response(JSON.stringify({ success: true, message: 'Cookie deleted successfully' }))
//     } catch (error) {
//         console.error('Error deleting cookie:', error)
//     }
// }

import { cookies } from "next/headers";

export async function DELETE() {
  try {
    const cookieStore = cookies();

    // Delete the cookie
    cookieStore.delete("id");

    // Check if the cookie still exists
    const hasCookie = cookieStore.has("id");

    if (hasCookie) {
      return new Response(
        JSON.stringify({ success: false, message: "Error in deleting cookie" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Cookie deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cookie:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting cookie" }),
      { status: 500 }
    );
  }
}

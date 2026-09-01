import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';

export default async function Blogs() {
  await dbConnect();
  const blogsData = await Blog.find({}).sort({ createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(blogsData));

  const featuredBlogIndex = blogs.findIndex((b: any) => b.featured);
  const featuredBlog = featuredBlogIndex !== -1 ? blogs[featuredBlogIndex] : blogs[0];
  const otherBlogs = blogs.filter((b: any) => b._id !== featuredBlog?._id);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <section id="blogs" className="section-padding max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-paper">Latest News & Stories</h2>
      </div>

      {featuredBlog && (
        <div className="bg-paper/5 border border-paper/10 rounded-2xl overflow-hidden w-full md:flex mb-8">
          <div className="md:w-1/2 h-64 md:h-auto shrink-0">
            <img 
              src={featuredBlog.coverImage || '/placeholder.jpg'} 
              alt={featuredBlog.title}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-coral text-paper text-xs px-3 py-1 rounded-full font-semibold">
                FEATURED
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-paper mb-3">{featuredBlog.title}</h3>
            <p className="text-paper/70 mb-6">{featuredBlog.excerpt}</p>
            <Link href={`/blog/${featuredBlog.slug || featuredBlog._id}`} className="text-coral font-medium hover:underline inline-flex items-center">
              Read More <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {otherBlogs.map((blog: any) => (
          <div key={blog._id} className="bg-paper/5 border border-paper/10 rounded-xl overflow-hidden flex flex-col">
            <img 
              src={blog.coverImage || '/placeholder.jpg'} 
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-xs text-paper/40 mb-2">{formatDate(blog.createdAt)}</p>
              <h4 className="text-lg font-serif font-semibold text-paper mb-2">{blog.title}</h4>
              <p className="text-sm text-paper/60 mb-4 flex-1">{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug || blog._id}`} className="text-coral text-sm font-medium hover:underline">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import ScrollAnimationWrapper, { StaggeredGrid } from '@/app/components/ScrollAnimationWrapper';

export default async function Blogs() {
  await dbConnect();
  const blogsData = await BlogPost.find({}).sort({ publishedAt: -1 }).lean();
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
    <section id="blogs" className="section-padding bg-indigo-base overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-paper">Latest News &amp; Stories</h2>
            <p className="mt-4 text-paper/60 text-lg max-w-2xl mx-auto">
              Stay updated with the latest happenings and stories from across our cultural societies.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {featuredBlog && (
          <ScrollAnimationWrapper direction="up" delay={0.2}>
            <div className="bg-paper/5 border border-paper/10 rounded-2xl overflow-hidden w-full md:flex mb-8">
              <div className="md:w-1/2 h-64 md:h-auto shrink-0">
                <img
                  src={featuredBlog.coverImageUrl || '/placeholder.jpg'}
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
                <p className="text-paper/70 mb-4">{featuredBlog.excerpt}</p>
                <p className="text-xs text-paper/40">{formatDate(featuredBlog.publishedAt)}</p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        )}

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {otherBlogs.map((blog: any) => (
            <div key={blog._id} className="bg-paper/5 border border-paper/10 rounded-xl overflow-hidden flex flex-col h-full">
              <img
                src={blog.coverImageUrl || '/placeholder.jpg'}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs text-paper/40 mb-2">{formatDate(blog.publishedAt)}</p>
                <h4 className="text-lg font-serif font-semibold text-paper mb-2">{blog.title}</h4>
                <p className="text-sm text-paper/60 flex-1">{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </StaggeredGrid>
      </div>
    </section>
  );
}

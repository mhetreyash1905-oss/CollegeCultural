import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import ScrollAnimationWrapper from '@/app/components/ScrollAnimationWrapper';

export default async function Events() {
  await dbConnect();
  const eventsData = await Event.find({}).sort({ date: 1 }).lean();
  const events = JSON.parse(JSON.stringify(eventsData));

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <section id="events" className="section-padding max-w-5xl mx-auto overflow-hidden">
      <ScrollAnimationWrapper direction="up">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-paper">Upcoming Events</h2>
        </div>
      </ScrollAnimationWrapper>

      <div className="relative">
        {/* Center line */}
        <div className="absolute w-0.5 bg-violet/30 h-full left-4 md:left-1/2 md:-translate-x-1/2"></div>
        
        <div className="space-y-12">
          {events.map((event: any, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <ScrollAnimationWrapper 
                key={event._id}
                direction={isEven ? 'right' : 'left'} 
                className="relative flex items-center md:justify-between flex-col md:flex-row"
              >
                {/* Desktop Left / Mobile Right */}
                <div className={`w-full pl-12 md:pl-0 md:w-[45%] ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                  <div className="bg-paper/5 backdrop-blur-sm border border-paper/10 rounded-xl p-6">
                    <p className="text-marigold font-semibold text-sm mb-1">{formatDate(event.date)}</p>
                    <h3 className="text-xl font-serif font-bold text-paper">{event.title}</h3>
                    <p className="text-paper/70 text-sm mt-2">{event.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-violet border-4 border-indigo-base md:order-1 mt-6 md:mt-0 top-0 md:top-1/2 md:-translate-y-1/2 z-10"></div>
                
                {/* Empty space for alternating layout on desktop */}
                <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-2' : ''}`}></div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

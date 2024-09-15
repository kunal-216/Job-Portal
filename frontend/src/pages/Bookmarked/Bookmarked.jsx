import { Sidebar, BookmarkCard } from '../../components';
import { useContextProvider } from '../../context/StoreContext';

const Bookmarked = () => {

  const { bookmarkData, setBookmarkData } = useContextProvider();
  const bookmarks = bookmarkData || []
  const handleDeleteBookmark = (id) => {
    setBookmarkData(prevData => prevData.filter(bookmarks => bookmarks._id !== id))
  }

  return (
    <div className='flex flex-row min-h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center min-h-screen bg-gray-100 mt-2 mb-6'>
        <header className='bg-blue-600 text-white p-3 md:p-4 m-2 mb-4 rounded-lg shadow-lg w-full lg:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md '>
          <div className='container mx-auto text-center'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold'>Bookmarks</h1>
          </div>
        </header>
        <div className='w-[97%] lg:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md'>
          {bookmarks.length !== 0 ? bookmarks.map((opportunity) => (
            <BookmarkCard
              key={opportunity._id} id={opportunity._id} type={opportunity.type} createdAt={opportunity.createdAt}
              companyName={opportunity.companyName} companyLogo={opportunity.companyLogo}
              opportunityType={opportunity.opportunityType} title={opportunity.title} opportunityId={opportunity.opportunityId}
              salary={opportunity.salary} location={opportunity.location} onDelete={handleDeleteBookmark}
            />
          )) :
            <>
              <p className='text-xl md:text-2xl text-gray-700 flex justify-center items-center mt-60'>No Bookmarks yet!</p>
            </>}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;

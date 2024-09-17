import { useState } from 'react';
import { HotelCard } from '../../components/HotelCard/HotelCard';
import { SearchFilter } from '../../components/Fillters/SearchFillter/SearchFillter';

const SearchPage = () => {
    const hotels = Array(20).fill({
        name: 'Pantheon Suite',
        price: '₪10,038',
        location: 'Rome, 350 m from centre',
    });

    const [budget, setBudget] = useState([300, 3000]);

    const handleBudgetChange = (event) => {
        const value = Number(event.target.value);
        setBudget([value, budget[1]]);
    };

    return (
        <div className="font-sans">
            <header className="">
                <SearchFilter/>
            </header>

            <main className="max-w-6xl mx-auto flex flex-col sm:flex-row py-6 space-y-6 sm:space-y-0 sm:space-x-6 px-4">
                <aside className="w-full sm:w-64">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="font-bold mb-2">Filter by:</h3>
                        <div className="mb-4">
                            <label className="block mb-2">Your budget (per night)</label>
                            <input
                                type="range"
                                min="300"
                                max="3000"
                                value={budget[0]}
                                onChange={handleBudgetChange}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs mt-1">
                                <span>₪300</span>
                                <span>₪3,000+</span>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 font-bold">Top filters</label>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" className="mr-2" />
                                <span>Rome City Centre</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" className="mr-2" />
                                <span>Free cancellation</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" className="mr-2" />
                                <span>Kitchen/kitchenette</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex flex-col items-center">
                    <div className="mb-4 text-center">
                        <h2 className="text-xl font-bold">Rome: 3,480 properties found</h2>
                    </div>

                    <div className="w-full flex flex-col items-center">
                        {hotels.map((hotel, index) => (
                            <div
                                key={index}
                                className="w-[900px] h-[300px] mb-4 bg-white/0 rounded-2xl shadow-md"
                            >
                                <HotelCard
                                    name={hotel.name}
                                    price={hotel.price}
                                    location={hotel.location}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SearchPage;
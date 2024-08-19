import { useState, useRef } from 'react';
import { useGetLocationsQuery } from '../../Redux/slices/getWeatherApi';
import { useDispatch, useSelector } from 'react-redux';
import { addSearch } from '../../Redux/slices/searchSlice';
import { FaHistory } from 'react-icons/fa';

export default function SearchBar() {
    const dispatch = useDispatch();
    const inputRef = useRef('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1); 

    const { data: locations = [], isFetching } = useGetLocationsQuery(
        { city: inputRef.current.value },
        { skip: !triggerSearch }
    );

    const searchHistory = useSelector((state) => state.search);

    const handleInputChange = () => {
        setShowSuggestions(false);
        setTriggerSearch(false);
        setSelectedIndex(-1); // Reset the selected index
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current.value) {
            setTriggerSearch(true); // Trigger the fetch
            setShowSuggestions(true);
            setShowHistory(false); // Hide history when searching
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setShowSuggestions(false);
        inputRef.current.value = `${suggestion.name},${suggestion.country}`;
        dispatch(addSearch(`${suggestion.name},${suggestion.country}`));
        setSelectedIndex(-1); // Reset the selected index after selection
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
                prevIndex < locations.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : locations.length - 1
            );
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(locations[selectedIndex]);
        }
    };

    const toggleHistory = () => {
        setShowHistory(!showHistory);
        setShowSuggestions(false);
    };


    return (
        <>
         <div className="relative w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} onFocus={() => { setShowSuggestions(false) }} className="flex items-center relative">
                <input
                    type="text"
                    ref={inputRef}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Add the keydown event handler
                    placeholder="Search for a city..."
                    className="w-full p-2 pr-16 pl-4 border border-gray-600 rounded-lg focus:outline-none focus:border-gradient-start text-gray-200 bg-dark-bg"
                />
                <button
                    type="button"
                    onClick={toggleHistory}
                    className="absolute right-20 top-2 text-gray-400 hover:text-white focus:outline-none"
                >
                    <FaHistory size={20} />
                </button>
                <button
                    type="submit"
                    className="bg-gradient-start text-white p-2 rounded-r-lg hover:bg-gradient-end focus:outline-none absolute right-0 top-0 bottom-0"
                >
                    Search
                </button>
            </form>
            {(locations.length<1)&&showSuggestions&&<p>Please enter a valid location</p>}
            {showHistory && searchHistory.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-dark-bg border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                    {searchHistory.map((historyItem, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                inputRef.current.value = historyItem;
                                setShowHistory(false);
                                dispatch(addSearch(historyItem));
                            }}
                            className="p-2 cursor-pointer hover:bg-gray-700 text-gray-200"
                        >
                            {historyItem}
                        </li>
                    ))}
                </ul>
            )}

            {isFetching ? (
                <p className="text-gray-400">Loading...</p>
            ) : (
                showSuggestions && locations.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 bg-dark-bg border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                        {locations.map((location, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(location)}
                                className={`p-2 cursor-pointer hover:bg-gray-700 flex justify-between items-center text-gray-200 ${
                                    index === selectedIndex ? 'bg-gray-700' : ''
                                }`}
                            >
                                <span>
                                    {location.name}, {location.country}
                                </span>
                                <img
                                    src={`http://openweathermap.org/images/flags/${location.country.toLowerCase()}.png`}
                                    alt={`${location.country} flag`}
                                    className="w-6 h-4 ml-2"
                                />
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
        </>       
    );
}

import { createContext, ReactNode, useContext, useState } from 'react';

export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

type FavouritesContextType = {
    favourites: Meal[];
    addfavourite: (meal: Meal) => void;
    removeFavourite: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
    const [favourites, setFavourites] = useState<Meal[]>([]);

    const addfavourite = (meal: Meal) => {
        setFavourites((prev) => [...prev, meal]);
    };

    const removeFavourite = (id: string) => {
        setFavourites((prev) => prev.filter((meal) => meal.idMeal !== id));
    };

    return (
    <FavouritesContext.Provider value={{ favourites, addfavourite, removeFavourite }}>
        {children}
    </FavouritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavorites hooku FavouritesProvider ile kullanılmalıdır');
    }
    return context;
};

import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

  
export default function NavBar() {
  return (
    <nav>
      <SearchBar/>
      <CategoryList categories={categories}/>
    </nav>
  );
}

function Category({ category }) {
  return (
    <NavLink className="category" to={`/${category.toLowerCase()}`}>
      {category}
    </NavLink>
  );
}


function CategoryList({categories}){
  return (
  <div className="category-list">
    {categories.map((category) => (
      <Category key={category} category={category}/>
    ))}
  </div>);
}

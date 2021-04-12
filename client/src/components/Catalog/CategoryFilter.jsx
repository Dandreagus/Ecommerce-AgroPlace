import React from 'react'
import '../../scss/components/Catalog/_Filter.scss'
import { useDispatch, useSelector} from "react-redux";
import { filterCategory } from '../../redux/categoryFilterReducer/categoryFilterActions';
import { resetQuery } from '../../redux/searchReducer/searchActions';
import DivText from '../ProductCard/DivText'

function CategoryFilter(){
    const categories = useSelector(state => state.categoryFilterReducer.categories)
    const categoryFiltered = useSelector(state => state.categoryFilterReducer.categoryFiltered)
    const dispatch = useDispatch();

    function handleClick(cat){
        dispatch(filterCategory(cat))
        if(cat.length === 0){
            dispatch(resetQuery())
        }
    }

    return (
        <div className='containerFilter'>
            <div className='categoriesFilter' onClick={() => handleClick('')}>
                <b><DivText content='Catalogo'/></b>
            </div>     
            {
                categories.map((category, index) => {
                    return (
                        categoryFiltered === category.name ? <div className='categoriesLoaded  activeCategory' key={index}  onClick={() => handleClick(category.name)}>               
                            <DivText className='categoryButton' content={category.name}/>                                  
                        </div>
                        : <div className='categoriesLoaded' key={index}  onClick={() => handleClick(category.name)}>               
                            <DivText className='categoryButton' content={category.name}/>                                  
                        </div>
                        )
                })
            }   
        </div>
    )
}

export default CategoryFilter
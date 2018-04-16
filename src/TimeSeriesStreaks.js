import React from "react";
import Swatch from "./Swatch";

import { 
    
    consecutiveUpStreaks as cus,
    consecutiveUpStreakSums as cuss,
    sequentialUpStreaks as sus,
    sequentialUpStreakSums as suss
    
} from "./streaks";

const upStreaks = ( { series, data, strategy } ) => 
    
    <table>
        
        <tbody>
        { strategy( series, data ).map( x =>
        
            <tr key={ x.id }>
            
                <td className="name"><Swatch {...x.series} />{ x.series.name }</td>
                <td className="visual-sizer">
                    <span className="up" style={{ width: x.percentage + "%" }}></span>
                </td>
                <td className="length">{ x.streak.max }</td>
                
            </tr>
        
        ) }
        </tbody>
        
    </table>;

export const sequentialUpStreaks = props => upStreaks( { ...props, strategy: sus } );
export const consecutiveUpStreaks = props => upStreaks( { ...props, strategy: cus } );
export const sequentialUpStreakSums = props => upStreaks( { ...props, strategy: suss } );
export const consecutiveUpStreakSums = props => upStreaks( { ...props, strategy: cuss } );

export default props =>

    <section className="streaks">
        
        { ( props.strategy || sequentialUpStreaks )( props ) }
        
    </section>;

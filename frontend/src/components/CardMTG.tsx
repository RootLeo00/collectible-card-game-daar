import { useTheme } from '@mui/material/styles';
import { CardMedia, Card, CardHeader } from '@mui/material';
import * as Scry from "scryfall-sdk";
import { useEffect, useState } from 'react';

interface CardData {
    id: string;
    name: string;
    imageUrl: string | undefined;
    set_name: string;
}
const CardMTG = ({ id }) => {

    const theme = useTheme();
    const [cardData, setCardData] = useState<CardData | null>();

    useEffect(() => {
        // fetch data from backend
        Scry.Cards.byId(id)
            .then((response) => {
                setCardData(
                    {
                        id: response.id,
                        name: response.name,
                        imageUrl: response.image_uris?.normal,
                        set_name: response.set_name,
                    }
                );
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return ((cardData !== null || cardData != null || cardData !== undefined || cardData != undefined) ? (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={cardData?.name}
                subheader={cardData?.set_name}
            />
            <CardMedia
                component="img"
                height="500"
                image={cardData?.imageUrl}
                alt="Loading card..."
            />
        </Card>
    ) : (<p>loading card</p>))
}

export default CardMTG;

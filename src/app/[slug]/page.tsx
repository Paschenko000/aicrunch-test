import {Card, CardContent, Container, Typography} from "@mui/material";

export default async function ProductPage({params}: {params: {slug: string}}) {
    const data = await getProduct(params.slug);

    return (
        <Container style={{padding: "40px"}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {data.item.name}
                    </Typography>
                    <Typography>{data.item.description}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

async function getProduct(slug: string): Promise<any> {
    try {
        const data = await fetch('https://aicrunch-test.vercel.app/' + `/api/product/${slug}`);
        return await data.json();
    } catch (e) {
        // ERROR HANDLING
        console.error(e);
        return [];
    }
}

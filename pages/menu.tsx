import Box from '@mui/material/Box';
import Calendar from 'components/Calendar';
import Button from '@mui/material/Button';
import MenuModel from 'models/MenuModel';

const Menu = (props) => {
    const menus = props.menus;
    return (
        <Box>
            <Box>
                <h1>Menu</h1>
                <Calendar menus={menus} />
            </Box>
        </Box>
    )
}

export async function getServerSideProps(context) {
    const { req, res} = context;
    const { getSession } = await import("lib/get-session");
    const session = await getSession(req, res);

    const menus = await MenuModel.query().select('name', 'date')
        .where('userId', session.user.userId);

    return {
        props: {
            menus: JSON.parse(JSON.stringify(menus))
        }
    }
}

export default Menu;
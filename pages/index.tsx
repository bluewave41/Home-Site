import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MenuModel from 'models/MenuModel';
import format from 'date-fns/format';

export default function Home(props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Home Site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            {props.loggedIn &&
                <main className={styles.main}>
                    <h1>At a glance view</h1>
                    {props.menu 
                        ? <h3>Tonight you're cooking: {props.menu}.</h3>
                        : <h3>You have no meal set for today.</h3>
                    }
                    
                </main>
            }
        </div>
    )
}


export async function getServerSideProps(context) {
    const { req, res} = context;
    const { getSession } = await import("lib/get-session");
    const session = await getSession(req, res);
    if(!session.user) {
        return {
            props: {
                loggedIn: false
            }
        }
    }

    const date = format(new Date(), 'yyyy-MM-dd');

    //get todays menu
    const menu = await MenuModel.query().select('name')
        .findOne('userId', session.user.userId)
        .findOne('date', date);

    return {
        props: {
            loggedIn: true,
            menu: menu ? menu.name : ''
        }
    }
}
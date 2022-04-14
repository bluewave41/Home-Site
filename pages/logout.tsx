const Logout = () => {
    return (
        <div>

        </div>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { getSession } = await import("lib/get-session");
    const session = await getSession(req, res);
    await session.destroy();

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return {
        props: {}
    }
}

export default Logout;
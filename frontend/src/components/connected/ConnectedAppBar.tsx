import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { selectUser } from '../../app/features/user/userSelectors';
import { useGetCartQuery, useLogoutUserMutation } from '../../app/api';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../app/features/user/userSlice';
import { useMemo } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import Cart from '../../models/Cart';
import { BASE_URL } from '../../app/constants';


interface ActionItem {
    label: string,
    onClick: VoidFunction,
}

const ConnectedAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const { data: cart = {} as Cart } = useGetCartQuery();
    const { totalQuantity = 0 } = cart;

    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const settings: ActionItem[] = useMemo(() => [
        {
            label: 'Profile',
            onClick: () => navigate('profile'),
        },
        {
            label: 'Logout',
            onClick: async () => {
                try {
                    handleCloseNavMenu();
                    handleCloseUserMenu();
                    await logoutUser({}).unwrap();
                    dispatch(clearUser());
                    navigate('login');
                }
                catch {
                    console.log("Logout failed!");
                }
            }
        }
    ], [logoutUser, dispatch, navigate]);

    const pages: ActionItem[] = [{
        label: 'Products',
        onClick: () => navigate('products')
    }];

    const { email, firstName, lastName, image } = useAppSelector(selectUser);
    const isLoggedIn = email !== "";
    console.log(email)
    const fullName = `${firstName} ${lastName}`;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StorefrontIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MyStore
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.label}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        page.onClick();
                                    }}
                                >
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <StorefrontIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MyStore
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    page.onClick();
                                }}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.10)',
                                    }
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    {isLoggedIn ? (
                        <>
                            <Badge badgeContent={totalQuantity} color="error" sx={{ mr: 3 }}>
                                <IconButton onClick={() => navigate('/cart')} sx={{ color: 'white' }}>
                                    <ShoppingCartOutlinedIcon />
                                </IconButton>
                            </Badge>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={fullName} src={`${BASE_URL}${image}`} /> {/** wire src to profile image */}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting.label}
                                            onClick={() => {
                                                setting.onClick();
                                                handleCloseUserMenu();
                                            }}
                                        >
                                            <Typography textAlign="center">{setting.label}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </>
                    )
                        :
                        <Button
                            onClick={() => navigate('login')}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'block',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.10)',
                                }
                            }}>
                            Login
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ConnectedAppBar;

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Theme, styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import { REACT_APP_CLOUDINARY_ENDPOINT } from "../../constant";
import { Room } from "../../models/room";
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

export default function NewRoom({
    isOpen,
    onClose,
    reFetch,
    serviceRoomSystem,
}: any) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme();
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    function getStyles(
        name: string,
        personName: readonly string[],
        theme: Theme
    ) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const [file, setFile] = useState<any>(null);
    const [room, setRoom] = useState<Room>();

    const handleChangeServiceRoom = (event: any) => {
        handleChangeRoom({ serviceIds: event.target.value });
    };

    const handleChangeRoom = (values: any) => {
        setRoom({
            ...room,
            ...values,
        });
    };
    const handleClose = () => {
        onClose();
    };

    const handleChangeFile = (e: any) => {
        setFile(e.target.files[0]);
    };

    const uploadImg = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stndhxae");
        const res = await axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData);
        return res.data.url;
    };
    const save = () => {
        const saveRoom = async () => {
            if (!file) {
                return;
            }
            const image = await uploadImg(file);
            const res = await axiosInstance.post("/room/createRoom", {
                ...room,
                image,
            });
            reFetch();
            handleClose();
        };
        saveRoom();
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Tạo phòng mới</DialogTitle>
            <Box
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    m: "10px 20px 10px 20px",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    marginLeft={2}
                >
                    <Box
                        display="flex"
                        flex={1}
                        sx={{ mr: 2 }}
                        flexDirection="column"
                        justifyContent="flex-end"
                    >
                        <Box display={'flex'} justifyContent="center" alignItems="center">
                            {
                                !file ?
                                    <PhotoSizeSelectActualOutlinedIcon sx={{ color: "#91CB63", fontSize: "500px" }} />
                                    :
                                    <img src={URL.createObjectURL(file as any)} style={{ borderRadius: "20px", marginTop: "20px", maxWidth: "500px", maxHeight: "500px", objectFit: "contain" }} />
                            }
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: "#333",
                                    "&:hover": { backgroundColor: "#000" },
                                }}
                                size="large"
                            >
                                Chọn ảnh
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleChangeFile}
                                />
                            </Button>
                        </Box>
                    </Box>
                    <Divider
                        orientation="vertical"
                        flexItem
                    />
                    <Stack
                        spacing={2}
                        flex={1}
                        sx={{ margin: 2 }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Loại phòng
                            </Typography>
                            <TextField
                                required
                                id="outlined-basic"
                                label="Loại phòng"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                value={room?.roomType}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        roomType: e.target.value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Số lượng:
                            </Typography>
                            <TextField
                                required
                                id="outlined-start-adornment"
                                label="Số lượng phòng"
                                sx={{ flex: 1 }}
                                value={room?.quantity}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        quantity: +e.target.value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Giá:
                            </Typography>
                            <TextField
                                required
                                id="outlined-start-adornment"
                                label="Giá"
                                sx={{ flex: 1 }}
                                value={room?.price}
                                onChange={(e) =>
                                    handleChangeRoom({ price: +e.target.value })
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            VND
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Số lượng người tối đa:
                            </Typography>
                            <TextField
                                required
                                id="outlined-start-adornment"
                                label="Số lượng người tối đa"
                                sx={{ flex: 1 }}
                                value={room?.maxPeople}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        maxPeople: +e.target.value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Mô tả:
                            </Typography>
                            <TextField
                                required
                                id="outlined-basic"
                                label="Mô tả"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                value={room?.description}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        description: e.target.value,
                                    })
                                }
                                multiline
                                maxRows={4}
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Dịch vụ:
                            </Typography>
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel id="demo-multiple-chip-label" required>
                                    Dịch vụ
                                </InputLabel>
                                <Select
                                    label="Dịch vụ"
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={room?.serviceIds || []}
                                    onChange={handleChangeServiceRoom}
                                    input={
                                        <OutlinedInput
                                            id="select-multiple-chip"
                                            label="Dịch vụ"
                                        />
                                    }
                                    renderValue={(serviceIds) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {serviceIds.map(
                                                (serviceId: any) => {
                                                    let service =
                                                        serviceRoomSystem.find(
                                                            (service: any) =>
                                                                serviceId ===
                                                                service._id
                                                        ) as any;
                                                    return (
                                                        <Chip
                                                            key={service._id}
                                                            label={
                                                                service.serviceName
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {serviceRoomSystem.map((services: any) => (
                                        <MenuItem
                                            key={services._id}
                                            value={services._id!}
                                            style={getStyles(
                                                services._id,
                                                room?.serviceIds || [],
                                                theme
                                            )}
                                        >
                                            {services.serviceName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ mr: "20px" }}
                >
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    onClick={save}
                    sx={{ m: "10px" }}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
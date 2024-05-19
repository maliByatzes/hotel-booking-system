--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: addon; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.addon (
    id integer NOT NULL,
    addon_name character varying(100) NOT NULL,
    price integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.addon OWNER TO admin;

--
-- Name: addon_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.addon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addon_id_seq OWNER TO admin;

--
-- Name: addon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.addon_id_seq OWNED BY public.addon.id;


--
-- Name: booking; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.booking (
    id integer NOT NULL,
    guest_id integer NOT NULL,
    payment_status_id integer NOT NULL,
    checkin_date date NOT NULL,
    checkout_date date NOT NULL,
    num_adults integer NOT NULL,
    num_children integer NOT NULL,
    booking_amount integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.booking OWNER TO admin;

--
-- Name: booking_addon; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.booking_addon (
    booking_id integer NOT NULL,
    addon_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.booking_addon OWNER TO admin;

--
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booking_id_seq OWNER TO admin;

--
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.booking.id;


--
-- Name: booking_room; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.booking_room (
    booking_id integer NOT NULL,
    room_id integer NOT NULL
);


ALTER TABLE public.booking_room OWNER TO admin;

--
-- Name: floor; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.floor (
    id integer NOT NULL,
    floor_number character varying(5) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.floor OWNER TO admin;

--
-- Name: floor_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.floor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.floor_id_seq OWNER TO admin;

--
-- Name: floor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.floor_id_seq OWNED BY public.floor.id;


--
-- Name: guest; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.guest (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email_address character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    verified boolean DEFAULT false,
    password text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.guest OWNER TO admin;

--
-- Name: guest_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.guest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guest_id_seq OWNER TO admin;

--
-- Name: guest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.guest_id_seq OWNED BY public.guest.id;


--
-- Name: payment_status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.payment_status (
    id integer NOT NULL,
    payment_status_name character varying(50) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.payment_status OWNER TO admin;

--
-- Name: payment_status_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payment_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_status_id_seq OWNER TO admin;

--
-- Name: payment_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payment_status_id_seq OWNED BY public.payment_status.id;


--
-- Name: room; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.room (
    id integer NOT NULL,
    floor_id integer NOT NULL,
    room_class_id integer NOT NULL,
    status_id integer NOT NULL,
    room_number character varying(10) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.room OWNER TO admin;

--
-- Name: room_class; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.room_class (
    id integer NOT NULL,
    class_name character varying(100) NOT NULL,
    base_price integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.room_class OWNER TO admin;

--
-- Name: room_class_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.room_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_class_id_seq OWNER TO admin;

--
-- Name: room_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.room_class_id_seq OWNED BY public.room_class.id;


--
-- Name: room_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_id_seq OWNER TO admin;

--
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;


--
-- Name: room_status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.room_status (
    id integer NOT NULL,
    status_name character varying(100) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.room_status OWNER TO admin;

--
-- Name: room_status_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.room_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_status_id_seq OWNER TO admin;

--
-- Name: room_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.room_status_id_seq OWNED BY public.room_status.id;


--
-- Name: addon id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.addon ALTER COLUMN id SET DEFAULT nextval('public.addon_id_seq'::regclass);


--
-- Name: booking id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- Name: floor id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.floor ALTER COLUMN id SET DEFAULT nextval('public.floor_id_seq'::regclass);


--
-- Name: guest id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.guest ALTER COLUMN id SET DEFAULT nextval('public.guest_id_seq'::regclass);


--
-- Name: payment_status id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payment_status ALTER COLUMN id SET DEFAULT nextval('public.payment_status_id_seq'::regclass);


--
-- Name: room id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);


--
-- Name: room_class id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room_class ALTER COLUMN id SET DEFAULT nextval('public.room_class_id_seq'::regclass);


--
-- Name: room_status id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room_status ALTER COLUMN id SET DEFAULT nextval('public.room_status_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
214d9f7e-33f2-4789-bfb2-1d93f920c2d3	971283fff6712b69e038851701712c13855ca479a01b77fd6bd50f92cd55f84a	2024-05-19 09:58:04.270387+00	20240516194432_guest_booking_entity	\N	\N	2024-05-19 09:58:04.20227+00	1
b2974ff7-6ac8-4933-8f63-33e19464854b	78649c75b1c198da83f6a41a58a7a4b557a15de745c215629339adba24675b04	2024-05-19 09:58:05.742883+00	20240519095805_room_entity	\N	\N	2024-05-19 09:58:05.643111+00	1
38dc5be0-e080-48ec-a982-af8546ff9d1b	c2057be6d68f0ce203d3bd855d208029832e8490bb1d441282bcce9d3836ccc3	2024-05-19 10:48:37.992304+00	20240519104837_booking_room_entity	\N	\N	2024-05-19 10:48:37.956165+00	1
\.


--
-- Data for Name: addon; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.addon (id, addon_name, price, created_at, updated_at) FROM stdin;
1	Extra Luggage	20	2024-05-19 10:22:26.265	2024-05-19 10:22:26.265
2	In-flight Meal	15	2024-05-19 10:22:26.265	2024-05-19 10:22:26.265
3	Priority Boarding	30	2024-05-19 10:22:26.265	2024-05-19 10:22:26.265
4	Seat Selection	10	2024-05-19 10:22:26.265	2024-05-19 10:22:26.265
5	Wi-Fi	5	2024-05-19 10:22:26.265	2024-05-19 10:22:26.265
\.


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.booking (id, guest_id, payment_status_id, checkin_date, checkout_date, num_adults, num_children, booking_amount, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: booking_addon; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.booking_addon (booking_id, addon_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: booking_room; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.booking_room (booking_id, room_id) FROM stdin;
\.


--
-- Data for Name: floor; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.floor (id, floor_number, created_at, updated_at) FROM stdin;
1	1	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
2	2	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
3	3	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
4	4	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
5	5	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
\.


--
-- Data for Name: guest; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.guest (id, first_name, last_name, email_address, phone_number, verified, password, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payment_status; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payment_status (id, payment_status_name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.room (id, floor_id, room_class_id, status_id, room_number, created_at, updated_at) FROM stdin;
1	1	1	1	101	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
2	1	2	2	102	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
3	1	3	3	103	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
4	2	2	1	201	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
5	2	4	2	202	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
6	2	5	3	203	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
7	3	1	1	301	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
8	3	3	2	302	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
9	3	4	3	303	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
10	4	5	1	401	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
11	4	2	2	402	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
12	4	1	3	403	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
13	5	3	1	501	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
14	5	4	2	502	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
15	5	5	3	503	2024-05-19 10:37:03.338	2024-05-19 10:37:03.338
\.


--
-- Data for Name: room_class; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.room_class (id, class_name, base_price, created_at, updated_at) FROM stdin;
1	Standard	100	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
2	Deluxe	150	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
3	Suite	250	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
4	Family	200	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
5	Penthouse	400	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
\.


--
-- Data for Name: room_status; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.room_status (id, status_name, created_at, updated_at) FROM stdin;
1	Available	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
2	Occupied	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
3	Reserved	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
4	Under Maintenance	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
5	Out of Service	2024-05-19 10:24:42.568	2024-05-19 10:24:42.568
\.


--
-- Name: addon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.addon_id_seq', 5, true);


--
-- Name: booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.booking_id_seq', 1, false);


--
-- Name: floor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.floor_id_seq', 5, true);


--
-- Name: guest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.guest_id_seq', 1, false);


--
-- Name: payment_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payment_status_id_seq', 1, false);


--
-- Name: room_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.room_class_id_seq', 5, true);


--
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.room_id_seq', 15, true);


--
-- Name: room_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.room_status_id_seq', 5, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: addon addon_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.addon
    ADD CONSTRAINT addon_pkey PRIMARY KEY (id);


--
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id);


--
-- Name: floor floor_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.floor
    ADD CONSTRAINT floor_pkey PRIMARY KEY (id);


--
-- Name: guest guest_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT guest_pkey PRIMARY KEY (id);


--
-- Name: payment_status payment_status_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payment_status
    ADD CONSTRAINT payment_status_pkey PRIMARY KEY (id);


--
-- Name: room_class room_class_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room_class
    ADD CONSTRAINT room_class_pkey PRIMARY KEY (id);


--
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


--
-- Name: room_status room_status_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room_status
    ADD CONSTRAINT room_status_pkey PRIMARY KEY (id);


--
-- Name: booking_addon_booking_id_addon_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX booking_addon_booking_id_addon_id_key ON public.booking_addon USING btree (booking_id, addon_id);


--
-- Name: booking_room_booking_id_room_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX booking_room_booking_id_room_id_key ON public.booking_room USING btree (booking_id, room_id);


--
-- Name: guest_email_address_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX guest_email_address_key ON public.guest USING btree (email_address);


--
-- Name: guest_phone_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX guest_phone_number_key ON public.guest USING btree (phone_number);


--
-- Name: room_floor_id_room_class_id_status_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX room_floor_id_room_class_id_status_id_key ON public.room USING btree (floor_id, room_class_id, status_id);


--
-- Name: booking_addon booking_addon_addon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking_addon
    ADD CONSTRAINT booking_addon_addon_id_fkey FOREIGN KEY (addon_id) REFERENCES public.addon(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: booking_addon booking_addon_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking_addon
    ADD CONSTRAINT booking_addon_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.booking(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: booking booking_guest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_guest_id_fkey FOREIGN KEY (guest_id) REFERENCES public.guest(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: booking booking_payment_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_payment_status_id_fkey FOREIGN KEY (payment_status_id) REFERENCES public.payment_status(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: booking_room booking_room_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking_room
    ADD CONSTRAINT booking_room_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.booking(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: booking_room booking_room_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.booking_room
    ADD CONSTRAINT booking_room_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: room room_floor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES public.floor(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: room room_room_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_room_class_id_fkey FOREIGN KEY (room_class_id) REFERENCES public.room_class(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: room room_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.room_status(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


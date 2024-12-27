'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material';

const StyledButton = styled('button')(({ theme }) => ({
  fontSize: theme.typography.fontSize,
  padding: '10px 30px',
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
  textDecoration: 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-block',
  background: 'transparent',
  cursor: 'pointer',
  transition: `box-shadow ${theme.transitions.duration.standard}ms`,
  '&:hover': {
    boxShadow: `1px 1px 25px 10px ${theme.palette.primary.main}80`,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(120deg, transparent, ${theme.palette.primary.main}80, transparent)`,
    transition: `left ${theme.transitions.duration.standard}ms`,
  },
  '&:hover:before': {
    left: '100%',
  },
}));

type GradientButtonProps = ButtonProps

const GradientButton: React.FC<GradientButtonProps> = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default GradientButton;
